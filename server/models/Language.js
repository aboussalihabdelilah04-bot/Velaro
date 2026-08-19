const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nativeName: { type: String, default: '' },
  currency: { type: String, default: 'EUR' },
  currencySymbol: { type: String, default: '€' },
  active: { type: Boolean, default: true },
  direction: { type: String, enum: ['ltr', 'rtl'], default: 'ltr' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Language', languageSchema);
