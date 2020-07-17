const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.index);
router.get('/search', homeController.search);
router.post('/suscription', homeController.suscribe);

module.exports = router;