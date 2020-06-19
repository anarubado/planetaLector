const jsonModel = require('../models/jsonModel.js');
const homeModel = jsonModel('products.json');

const homeController = {

    index: function(req, res){
        let slidesProducts = homeModel.processSlideProducts(15,1);
        return res.render("index", {slidesProducts});
    },

    search: function(req, res){
        let keywords = req.query.keywords;
        let products = homeModel.search(keywords);
        return res.render("search", {keywords, products});
    }

    
}

module.exports = homeController;