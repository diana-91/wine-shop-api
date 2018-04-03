const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/', usersController.createUser);
router.get('/:id', usersController.getUser);
router.put('/:id', usersController.editUser);

module.exports = router;
