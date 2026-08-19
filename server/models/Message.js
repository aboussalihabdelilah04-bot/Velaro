const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  type: { type: String, enum: ['contact', 'reservation', 'support', 'other'], default: 'contact' },
  read: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  reply: { type: String, default: '' },
  repliedAt: { type: Date }
}, { timestamps: true });

messageSchema.index({ read: 1 });
messageSchema.index({ createdAt: -1 });
messageSchema.index({ email: 1 });

module.exports = mongoose.model('Message', messageSchema);
