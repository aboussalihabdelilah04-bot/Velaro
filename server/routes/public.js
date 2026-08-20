const express = require('express');
const { createPublicCrudRoutes } = require('./crudFactory');
const Car = require('../models/Car');
const Motorcycle = require('../models/Motorcycle');
const Villa = require('../models/Villa');
const Excursion = require('../models/Excursion');
const Transfer = require('../models/Transfer');
const Pack = require('../models/Pack');
const Review = require('../models/Review');
const Settings = require('../models/Settings');
const Content = require('../models/Content');
const Language = require('../models/Language');
const Booking = require('../models/Booking');
const Message = require('../models/Message');
const rateLimit = require('express-rate-limit');
const { notifyAdminNewBooking, notifyAdminNewMessage } = require('../services/email');

const router = express.Router();

const publicBookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Trop de reservations, veuillez reessayer plus tard.' }
});

const publicMessageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Trop de messages, veuillez reessayer plus tard.' }
});

const productModelMap = {
  car: 'Car',
  motorcycle: 'Motorcycle',
  villa: 'Villa',
  excursion: 'Excursion',
  transfer: 'Transfer',
  pack: 'Pack'
};

function generateReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'VC-';
  for (let i = 0; i < 8; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));
  return ref;
}

router.post('/bookings', publicBookingLimiter, async (req, res) => {
  try {
    const {
      clientName, clientEmail, clientPhone,
      productType, productId, productName, productImage,
      startDate, endDate, time, people,
      duration, pricePerDay, totalPrice, message: notes
    } = req.body;

    if (!clientName || !clientPhone || !productType || !startDate || !endDate) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }

    if (clientEmail && clientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      return res.status(400).json({ error: 'Adresse email invalide.' });
    }

    const validTypes = ['car', 'motorcycle', 'villa', 'excursion', 'transfer', 'pack'];
    if (!validTypes.includes(productType)) {
      return res.status(400).json({ error: 'Type de produit invalide.' });
    }

    const booking = await Booking.create({
      reference: generateReference(),
      clientName: clientName.trim(),
      clientEmail: clientEmail ? clientEmail.toLowerCase().trim() : '',
      clientPhone: clientPhone.trim(),
      productType,
      productId: (productId && /^[0-9a-fA-F]{24}$/.test(productId)) ? productId : undefined,
      productModel: productModelMap[productType] || 'Car',
      productName: productName || 'Réservation',
      productImage: productImage || '',
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      time: time || '',
      people: parseInt(people) || 1,
      duration: parseInt(duration) || 1,
      pricePerDay: parseInt(pricePerDay) || 0,
      totalPrice: parseInt(totalPrice) || parseInt(pricePerDay) || 0,
      notes: notes || '',
      status: 'pending',
      paymentStatus: 'unpaid'
    });

    const result = booking.toObject();
    result.id = result._id.toString();

    notifyAdminNewBooking(booking).catch(err => {
      console.error('[Email] Failed to notify admin of new booking:', err.message);
    });

    res.status(201).json(result);
  } catch (err) {
    console.error('Public booking creation error:', err.message);
    res.status(500).json({ error: 'Erreur lors de la creation de la reservation.' });
  }
});

router.get('/bookings/:id', async (req, res) => {
  try {
    let booking = null;
    try {
      booking = await Booking.findById(req.params.id);
    } catch (e) {
      // Not a valid ObjectId, try reference lookup
    }
    if (!booking) {
      booking = await Booking.findOne({ reference: req.params.id });
    }
    if (!booking) return res.status(404).json({ error: 'Reservation non trouvee.' });
    const result = booking.toObject();
    result.id = result._id.toString();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

router.post('/messages', publicMessageLimiter, async (req, res) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Nom, email et message requis.' });
    }

    const msg = await Message.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: (phone || '').trim(),
      subject: (subject || '').trim(),
      message: message.trim(),
      type: type || 'contact',
      read: false
    });

    const result = msg.toObject();
    result.id = result._id.toString();

    notifyAdminNewMessage(msg).catch(err => {
      console.error('[Email] Failed to notify admin of new message:', err.message);
    });

    res.status(201).json(result);
  } catch (err) {
    console.error('Public message creation error:', err.message);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
  }
});

function addIdField(items) {
  if (Array.isArray(items)) {
    return items.map(item => {
      const obj = item.toObject ? item.toObject() : { ...item };
      obj.id = obj._id.toString();
      return obj;
    });
  }
  const obj = items.toObject ? items.toObject() : { ...items };
  obj.id = obj._id.toString();
  return obj;
}

router.use('/cars', createPublicCrudRoutes(Car, 'Voiture'));
router.use('/motorcycles', createPublicCrudRoutes(Motorcycle, 'Moto'));
router.use('/villas', createPublicCrudRoutes(Villa, 'Villa'));
router.use('/excursions', createPublicCrudRoutes(Excursion, 'Excursion'));
router.use('/transfers', createPublicCrudRoutes(Transfer, 'Transfert'));
router.use('/packs', createPublicCrudRoutes(Pack, 'Pack'));

router.get('/reviews', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const reviews = await Review.find({ status: 'approved' })
      .sort('-createdAt')
      .limit(parseInt(limit));
    res.json(addIdField(reviews));
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

router.get('/settings', async (req, res) => {
  try {
    const settings = await Settings.find().sort('key');
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

router.get('/content', async (req, res) => {
  try {
    const { category, language } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (language) filter.language = language;
    const items = await Content.find(filter).sort('key');
    const result = {};
    items.forEach(c => { result[c.key] = c.value; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

router.get('/languages', async (req, res) => {
  try {
    const languages = await Language.find({ active: true }).sort('order');
    res.json(addIdField(languages));
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;
