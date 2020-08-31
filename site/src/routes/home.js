const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.index);
router.get('/search', homeController.search);
router.post('/suscription', homeController.suscribe);

router.get('/failure', function(req, res){
    return res.render('checkout/failure');
})

router.get('/success', function(req, res){
    return res.render('checkout/success');
})

router.get('/pending', function(req, res){
    return res.render('checkout/pending');
})

router.get('/news', homeController.novedades)

module.exports = router;