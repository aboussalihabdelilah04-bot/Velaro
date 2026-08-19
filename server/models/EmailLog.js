const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  to: { type: String, required: true },
  type: { type: String, required: true },
  subject: { type: String, default: '' },
  status: { type: String, enum: ['sent', 'failed', 'pending'], default: 'sent' },
  error: { type: String, default: '' },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

emailLogSchema.index({ status: 1 });
emailLogSchema.index({ type: 1 });
emailLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('EmailLog', emailLogSchema);
