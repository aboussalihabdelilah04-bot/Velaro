const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EmailLog = require('../models/EmailLog');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { type, status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    const total = await EmailLog.countDocuments(filter);
    const logs = await EmailLog.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ data: logs, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
