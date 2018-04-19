const mongoose = require('mongoose');
const ORDER_STATE = require('./order-state');
const Schema   = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'The user id is required'],
    ref: 'User'
  },
  _productId: [{
    type: Schema.Types.ObjectId,
    required: [true, 'The product id is required'],
    ref: 'Product'
  }],
  date: {
    type: Date,
    default: Date.now
  },
  amount: [{
    type: Number,
    required: [true, 'The product amout is required']
  }],
  state: {
    type: String,
    enum: ORDER_STATE,
    required: [true, 'The order state is required']
  },
  totalPrice: {
    type: Number,
    required: [true, 'The order price is required']
  },
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
