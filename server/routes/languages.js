const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Language = require('../models/Language');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const languages = await Language.find().sort('order');
    res.json(languages);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { languages } = req.body;
    if (!Array.isArray(languages)) return res.status(400).json({ error: 'Format invalide.' });
    for (const lang of languages) {
      await Language.findOneAndUpdate(
        { code: lang.code },
        { code: lang.code, name: lang.name, nativeName: lang.nativeName, currency: lang.currency, currencySymbol: lang.currencySymbol, active: lang.active, direction: lang.direction, order: lang.order },
        { upsert: true }
      );
    }
    res.json({ message: 'Langues sauvegardees.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
