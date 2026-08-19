const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Client = require('../models/Client');
const Booking = require('../models/Booking');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { search, status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Client.countDocuments(filter);
    const clients = await Client.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ data: clients, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const total = await Client.countDocuments();
    const active = await Client.countDocuments({ status: 'active' });
    const newThisMonth = await Client.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });
    res.json({ total, active, newThisMonth });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client non trouve.' });
    const bookings = await Booking.find({ clientEmail: client.email }).sort('-createdAt');
    res.json({ client, bookings });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/:id/bookings', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client non trouve.' });
    const bookings = await Booking.find({ clientEmail: client.email }).sort('-createdAt');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
