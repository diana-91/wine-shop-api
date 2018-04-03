const mongoose = require('mongoose');
const Order = require('../models/order.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then(order => {
      if (order) {
        res.json(order)
      } else {
        next(new ApiError(`Order not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const order = new Order(req.body);
  order.save()
    .then(() => {
      res.status(201).json(order);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;

  Order.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(order => {
      if (order) {
        res.json(order)
      } else {
        next(new ApiError(`Order not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}
