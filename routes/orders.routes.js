const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orders.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', orderController.list);
router.get('/:id', orderController.get);
router.post('/', orderController.create);
router.put('/:id', orderController.edit);
router.get('/search/:id', orderController.searchOrdersUser);


module.exports = router;
