const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Settings = require('../models/Settings');
const { logActivity } = require('../utils/activityLogger');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const settings = await Settings.find(filter).sort('key');
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/:key', async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });
    res.json(setting || { key: req.params.key, value: '' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { settings } = req.body;
    if (!Array.isArray(settings)) {
      return res.status(400).json({ error: 'Format invalide.' });
    }
    for (const s of settings) {
      if (!s.key || typeof s.key !== 'string') continue;
      if (s.value === undefined || s.value === null) continue;
      await Settings.findOneAndUpdate(
        { key: s.key },
        { key: s.key, value: String(s.value), category: s.category || 'general', description: s.description || '' },
        { upsert: true }
      );
    }
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'settings_updated',
      resource: 'settings',
      details: 'Parametres mis a jour',
      ip: req.ip
    });
    res.json({ message: 'Parametres sauvegardes.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
