const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller');
const productMiddleware = require('../middleware/products.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

const parser = require('../configs/multer.config');

router.get('/', productController.list);
router.get('/:id', productController.get);
router.post('/', secureMiddleware.isAuthenticated, parser.single('image'), productController.create);
router.put('/:id', secureMiddleware.isAuthenticated, parser.single('image'), productController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, productMiddleware.checkValidId, productController.delete);

module.exports = router;
