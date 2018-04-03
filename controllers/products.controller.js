const mongoose = require('mongoose');
const Product = require('../models/product.model');
const ApiError = require('../models/api-error.model');
const fs = require('file-system');

module.exports.list = (req, res, next) => {
  Product.find()
    .then(products => res.json(products))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(product => {
      if (product) {
        res.json(product)
      } else {
        next(new ApiError(`Product not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const product = new Product(req.body);
  if (req.file) {
    product.image = `${req.protocol}://${req.get('host')}/products-image/${req.file.filename}`;
  }
  product.save()
    .then(() => {
      res.status(201).json(product);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndRemove(id)
    .then(product => {
      if (product) {
        res.status(204).json();
        fs.unlink(`/public/products-image/${product.image}`, (err) => {
          if (err) throw err;
          console.log(`successfully deleted /public/products-image/${product.image}`);
        });
      } else {
        next(new ApiError(`Product not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  if (req.file) {
    body.image = `${req.protocol}://${req.get('host')}/products-image/${req.file.filename}`;
  }

  Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(product => {
      if (product) {
        res.json(product)
      } else {
        next(new ApiError(`Product not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}
