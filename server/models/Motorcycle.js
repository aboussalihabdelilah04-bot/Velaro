const mongoose = require('mongoose');

const motorcycleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  engine: { type: String, default: '' },
  type: { type: String, default: 'Standard' },
  fuel: { type: String, enum: ['Essence', 'Diesel', 'Electrique'], default: 'Essence' },
  pricePerDay: { type: Number, required: true, min: 0 },
  category: { type: String, default: 'Moto' },
  image: { type: String, default: '' },
  images: [{ type: String }],
  features: [{ type: String }],
  available: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  description: { type: String, default: '' }
}, { timestamps: true });

motorcycleSchema.index({ available: 1 });
motorcycleSchema.index({ brand: 1 });
motorcycleSchema.index({ pricePerDay: 1 });
motorcycleSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Motorcycle', motorcycleSchema);
