const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller');
const productMiddleware = require('../middleware/products.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer  = require('multer');
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'products-image',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, 'products');
  }
});
const parser = multer({ storage: storage });

router.get('/', secureMiddleware.isAuthenticated, productController.list);
router.get('/:id', secureMiddleware.isAuthenticated, productMiddleware.checkValidId, productController.get);
router.post('/', secureMiddleware.isAuthenticated, parser.single('image'), productController.create);
router.put('/:id', secureMiddleware.isAuthenticated, parser.single('image'), productController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, productMiddleware.checkValidId, productController.delete);

module.exports = router;
