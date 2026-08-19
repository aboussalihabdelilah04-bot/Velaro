const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  totalBookings: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  firstBooking: { type: Date },
  lastBooking: { type: Date },
  status: { type: String, enum: ['active', 'inactive', 'blocked'], default: 'active' },
  notes: { type: String, default: '' }
}, { timestamps: true });

clientSchema.index({ name: 1 });
clientSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Client', clientSchema);
