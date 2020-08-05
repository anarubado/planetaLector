const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.index);
router.get('/detail/:idProduct', productsController.detail);
/*Rutas para editar un producto*/
router.get('/edit/:idProduct', productsController.edit);
router.post('/edit/:idProduct', productsController.update);

module.exports = router;
