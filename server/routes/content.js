const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Content = require('../models/Content');
const { logActivity } = require('../utils/activityLogger');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { category, language } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (language) filter.language = language;
    const content = await Content.find(filter).sort('key');
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/:key', async (req, res) => {
  try {
    const item = await Content.findOne({ key: req.params.key });
    res.json(item || { key: req.params.key, value: '' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ error: 'Format invalide.' });
    for (const item of items) {
      if (!item.key || typeof item.key !== 'string') continue;
      if (item.value === undefined || item.value === null) continue;
      await Content.findOneAndUpdate(
        { key: item.key },
        { key: item.key, value: String(item.value), type: item.type || 'text', category: item.category || 'general', label: item.label || '', language: item.language || 'fr' },
        { upsert: true }
      );
    }
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'content_updated',
      resource: 'content',
      details: 'Contenu du site mis a jour',
      ip: req.ip
    });
    res.json({ message: 'Contenu sauvegarde.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
