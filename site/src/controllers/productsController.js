const jsonModel = require('../models/jsonModel');
const productsModel = jsonModel('products.json');

const productsController = {

    index: function(req, res){
        return res.render('products');
    },
    
    detail: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15,3);
        let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
        let jkRowling = productsModel.filterNProducts("J. K. Rowling", 10);
        return res.render('detail', {harryPotter, jkRowling});
    }
}

module.exports = productsController;