const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const { logActivity } = require('../utils/activityLogger');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { status, rating, search, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (rating) filter.rating = parseInt(rating);
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { text: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Review.countDocuments(filter);
    const pendingCount = await Review.countDocuments({ status: 'pending' });
    const reviews = await Review.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ data: reviews, total, pendingCount, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) return res.status(404).json({ error: 'Avis non trouve.' });
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'review_status_changed',
      resource: 'review',
      resourceId: review._id.toString(),
      details: `Avis de ${review.name}: ${status}`,
      ip: req.ip
    });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/:id/featured', async (req, res) => {
  try {
    const { featured } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { featured }, { new: true });
    if (!review) return res.status(404).json({ error: 'Avis non trouve.' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Avis non trouve.' });
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'review_deleted',
      resource: 'review',
      resourceId: req.params.id,
      details: `Avis de ${review.name} supprime`,
      ip: req.ip
    });
    res.json({ message: 'Avis supprime.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
