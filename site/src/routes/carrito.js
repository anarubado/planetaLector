const express = require("express");
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/', carritoController.index);
//router.delete('/', carritoController.delete);


module.exports = router;