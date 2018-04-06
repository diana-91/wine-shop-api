const mongoose = require('mongoose');
const PRODUCT_TYPE = require('./product-type');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The product name is required']
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'The product price is required']
  },
  image: {
    type: String
  },
  category: [{
    type: String,
    enum: PRODUCT_TYPE
  }],
},
{
  timestamps: true,
  toJSON: {
      transform: (doc, ret) => {
          ret.id = doc._id;
          delete ret._id;
          delete ret.__v;
          return ret;
      }
    }
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
