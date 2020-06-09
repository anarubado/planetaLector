const express = require("express");
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.index);
router.get('/:detalle', productosController.detalle);

module.exports = router;
