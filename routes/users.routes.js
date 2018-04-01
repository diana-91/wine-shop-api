const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
//secure

router.post('/', usersController.createUser);
router.put('/:id', usersController.editUser);

module.exports = router;
