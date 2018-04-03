const mongoose = require('mongoose');
const ORDER_STATE = require('./orders-state');

const orderSchema = new mongoose.schema({
  numOrder: {
    type: Number,
    required: [true, 'The order number is required']
  },
  _userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'The user id is required']
  },
  _productId: [{
    type: Schema.Types.ObjectId,
    required: [true, 'The product id is required']
  }],
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'The order date is required']
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
