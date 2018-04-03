const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orders.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, orderController.list);
router.get('/:id', secureMiddleware.isAuthenticated, orderController.get);
router.post('/', secureMiddleware.isAuthenticated, orderController.create);
router.put('/:id', secureMiddleware.isAuthenticated, orderController.edit);

module.exports = router;
