const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  duration: { type: String, required: true },
  durationHours: { type: Number, default: 1 },
  price: { type: Number, required: true, min: 0 },
  difficulty: { type: String, default: 'Confort' },
  vehicle: { type: String, default: 'Mercedes Vito' },
  image: { type: String, default: '' },
  images: [{ type: String }],
  description: { type: String, default: '' },
  program: [{
    time: { type: String },
    activity: { type: String }
  }],
  included: [{ type: String }],
  notIncluded: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

transferSchema.index({ available: 1 });
transferSchema.index({ city: 1 });
transferSchema.index({ price: 1 });
transferSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Transfer', transferSchema);
