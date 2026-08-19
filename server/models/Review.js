const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  avatar: { type: String, default: '' },
  service: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'hidden', 'rejected'], default: 'pending' },
  featured: { type: Boolean, default: false },
  reply: { type: String, default: '' }
}, { timestamps: true });

reviewSchema.index({ status: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
