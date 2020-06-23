const jsonModel = require('../models/jsonModel.js');
const productsModel = jsonModel('products.json');

const homeController = {

    index: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15, 3);
        let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 5);
        let suspense = productsModel.filterNProducts("Suspenso", 5);
        let virginiaWoolf = productsModel.filterNProducts("Virginia Woolf", 5);
        let quarantine = productsModel.filterNProducts("Autoayuda", 5);

        return res.render("index", {isaacAsimov, suspense, virginiaWoolf, quarantine});
    },

    search: function(req, res){
        let keywords = req.query.keywords;
        let products = productsModel.search(keywords);
        return res.render("search", {keywords, products});
    }    
}

module.exports = homeController;