const mongoose = require('mongoose');

const packSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  badge: { type: String, default: '' },
  tagline: { type: String, default: '' },
  vehicle: { type: String, default: '' },
  accommodation: { type: String, default: '' },
  duration: { type: String, default: '1 jour' },
  durationDays: { type: Number, default: 1 },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  includes: [{ icon: { type: String }, label: { type: String } }],
  image: { type: String, default: '' },
  images: [{ type: String }],
  features: [{ type: String }],
  available: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  villa: { type: mongoose.Schema.Types.ObjectId, ref: 'Villa' },
  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

packSchema.index({ available: 1 });
packSchema.index({ price: 1 });
packSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Pack', packSchema);
