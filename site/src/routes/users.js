const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const {body} = require('express-validator')

router.get('/register', usersController.register);
router.post('/register',[
    body('email').notEmpty().withMessage('El campo de email es obligatorio').isEmail().withMessage('El campo debe ser un email'),
    body('user').notEmpty().withMessage('El campo de usuario es obligatorio').isLength({min:3}).withMessage('El usuario debe tener minimo 3 caracteres'),
    body('password').notEmpty().withMessage('El campo de contraseña es obligatorio').isLength({min:8}).withMessage('La contraseña debe tener minimo 8 caracteres'),
], usersController.save);

router.get('/login', usersController.login);

router.get('/cart', usersController.cart);

module.exports = router;