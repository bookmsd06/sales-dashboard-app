const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  revenue: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// create indexes
salesSchema.index({ date: 1 });
salesSchema.index({ product: 1 });
salesSchema.index({ category: 1 });
salesSchema.index({ region: 1 });
salesSchema.index({ date: 1, category: 1 });
salesSchema.index({ date: 1, region: 1 });

module.exports = mongoose.model('Sales', salesSchema);