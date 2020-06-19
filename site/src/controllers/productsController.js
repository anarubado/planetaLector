const jsonModel = require('../models/jsonModel');
const productsModel = jsonModel('products.json');

const productsController = {

    index: function(req, res){
        return res.render('products');
    },

    detail: function(req, res){
        let slidesProducts = homeModel.processSlideProducts(15,3);
        return res.render('detail', {slidesProducts});
    }
}

module.exports = productsController;