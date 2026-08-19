const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  clientName: { type: String, required: true, trim: true },
  clientEmail: { type: String, required: true, lowercase: true, trim: true },
  clientPhone: { type: String, required: true },
  productType: {
    type: String,
    required: true,
    enum: ['car', 'motorcycle', 'villa', 'excursion', 'transfer', 'pack']
  },
  productId: { type: mongoose.Schema.Types.ObjectId, refPath: 'productModel' },
  productModel: { type: String, required: true, enum: ['Car', 'Motorcycle', 'Villa', 'Excursion', 'Transfer', 'Pack'] },
  productName: { type: String, required: true },
  productImage: { type: String, default: '' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  time: { type: String, default: '' },
  people: { type: Number, default: 1 },
  duration: { type: Number, default: 1 },
  pricePerDay: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  currency: { type: String, default: 'MAD' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid', 'refunded'],
    default: 'unpaid'
  },
  paymentMethod: { type: String, default: '' },
  notes: { type: String, default: '' },
  cancelledBy: { type: String, default: '' },
  cancellationReason: { type: String, default: '' }
}, { timestamps: true });

bookingSchema.index({ status: 1 });
bookingSchema.index({ productType: 1 });
bookingSchema.index({ clientEmail: 1 });
bookingSchema.index({ startDate: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
