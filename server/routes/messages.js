const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const { logActivity } = require('../utils/activityLogger');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { search, read, type, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (typeof read === 'string' && (read === 'true' || read === 'false')) {
      filter.read = read === 'true';
    }
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Message.countDocuments(filter);
    const unreadCount = await Message.countDocuments({ read: false });
    const messages = await Message.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ data: messages, total, unreadCount, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message non trouve.' });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/:id/read', async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) return res.status(404).json({ error: 'Message non trouve.' });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/:id/unread', async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: false }, { new: true });
    if (!msg) return res.status(404).json({ error: 'Message non trouve.' });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/:id/reply', async (req, res) => {
  try {
    const { reply } = req.body;
    const msg = await Message.findByIdAndUpdate(req.params.id, {
      reply,
      replied: true,
      repliedAt: new Date()
    }, { new: true });
    if (!msg) return res.status(404).json({ error: 'Message non trouve.' });
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'message_replied',
      resource: 'message',
      resourceId: msg._id.toString(),
      details: `Reponse au message de ${msg.name}`,
      ip: req.ip
    });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message non trouve.' });
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'message_deleted',
      resource: 'message',
      resourceId: req.params.id,
      details: `Message de ${msg.name} supprime`,
      ip: req.ip
    });
    res.json({ message: 'Message supprime.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
