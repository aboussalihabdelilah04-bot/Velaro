const mongoose = require('mongoose');

const villaSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  pricePerNight: { type: Number, required: true, min: 0 },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  maxGuests: { type: Number, default: 2 },
  floors: { type: Number, default: 1 },
  elevator: { type: Boolean, default: false },
  pool: { type: Boolean, default: false },
  wifi: { type: Boolean, default: true },
  ac: { type: Boolean, default: true },
  kitchen: { type: Boolean, default: true },
  garden: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  terrace: { type: Boolean, default: false },
  tv: { type: Boolean, default: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  images: [{ type: String }],
  features: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' }
}, { timestamps: true });

villaSchema.index({ available: 1 });
villaSchema.index({ location: 1 });
villaSchema.index({ pricePerNight: 1 });
villaSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Villa', villaSchema);
