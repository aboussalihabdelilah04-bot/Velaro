const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, default: '' },
  type: { type: String, enum: ['text', 'textarea', 'image', 'json', 'html'], default: 'text' },
  category: { type: String, default: 'general' },
  label: { type: String, default: '' },
  language: { type: String, default: 'fr' }
}, { timestamps: true });

contentSchema.index({ category: 1 });
contentSchema.index({ language: 1 });

module.exports = mongoose.model('Content', contentSchema);
