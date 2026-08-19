const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  url: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  category: {
    type: String,
    enum: ['cars', 'motorcycles', 'villas', 'excursions', 'transfers', 'agency', 'general'],
    default: 'general'
  },
  productId: { type: String, default: '' },
  productName: { type: String, default: '' },
  alt: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

galleryImageSchema.index({ category: 1 });
galleryImageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
