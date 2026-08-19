const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, default: '' },
  category: { type: String, default: 'general' },
  description: { type: String, default: '' }
}, { timestamps: true });

settingsSchema.index({ category: 1 });

module.exports = mongoose.model('Settings', settingsSchema);
