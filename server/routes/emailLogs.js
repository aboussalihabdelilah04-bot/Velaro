const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EmailLog = require('../models/EmailLog');
const { sendMail, testConnection } = require('../services/email');

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

router.post('/test', async (req, res) => {
  try {
    const smtpCheck = await testConnection();
    if (!smtpCheck.ok) {
      return res.json({ smtp: false, error: smtpCheck.error, email: false });
    }
    const result = await sendMail({
      to: req.user.email || process.env.ADMIN_EMAIL,
      subject: '[VelaroCar] Test email',
      html: '<h2>Email test</h2><p>Si vous recevez cet email, la configuration SMTP fonctionne correctement.</p>',
      type: 'test'
    });
    res.json({ smtp: true, email: result.sent, messageId: result.messageId, error: result.reason });
  } catch (err) {
    res.json({ smtp: false, email: false, error: err.message });
  }
});

module.exports = router;
