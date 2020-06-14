const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register);
router.post('/register', usersController.save);
router.get('/login', usersController.login);
router.get('/cart', usersController.cart);

module.exports = router;