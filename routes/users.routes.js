const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.post('/', usersController.createUser);
router.get('/:id', secureMiddleware.isAuthenticated, usersController.getUser);
router.put('/:id', secureMiddleware.isAuthenticated, usersController.editUser);

module.exports = router;
