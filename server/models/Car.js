const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  fuel: { type: String, enum: ['Essence', 'Diesel', 'Hybride', 'Electrique'], default: 'Essence' },
  transmission: { type: String, enum: ['Manuelle', 'Automatique'], default: 'Manuelle' },
  seats: { type: Number, default: 5 },
  pricePerDay: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  image: { type: String, default: '' },
  images: [{ type: String }],
  features: [{ type: String }],
  available: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  description: { type: String, default: '' },
  licensePlate: { type: String, default: '' },
  mileage: { type: Number, default: 0 }
}, { timestamps: true });

carSchema.index({ available: 1 });
carSchema.index({ category: 1 });
carSchema.index({ brand: 1 });
carSchema.index({ pricePerDay: 1 });
carSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Car', carSchema);
