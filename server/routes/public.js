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

const router = express.Router();

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
