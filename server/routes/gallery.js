const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const GalleryImage = require('../models/GalleryImage');
const { logActivity } = require('../utils/activityLogger');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await GalleryImage.countDocuments(filter);
    const images = await GalleryImage.find(filter).sort('order').skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ data: images, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const image = await GalleryImage.create(req.body);
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'gallery_image_added',
      resource: 'gallery',
      resourceId: image._id.toString(),
      details: `Image ajoutee: ${image.title || image.url}`,
      ip: req.ip
    });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) return res.status(404).json({ error: 'Image non trouvee.' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image non trouvee.' });
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'gallery_image_deleted',
      resource: 'gallery',
      resourceId: req.params.id,
      details: `Image supprimee: ${image.title || image.url}`,
      ip: req.ip
    });
    res.json({ message: 'Image supprimee.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
