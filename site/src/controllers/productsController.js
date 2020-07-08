const jsonModel = require('../models/jsonModel');
const productsModel = jsonModel('products.json');

const productsController = {

    index: function(req, res){
        let novedades = productsModel.filterNProducts("Literatura", 1);
        let descuentos = productsModel.filterBySomething(function(product){
            return product.precio < 200;            
        })
        descuentos.splice(3, descuentos.length);

        let literatura = productsModel.readJson();

        return res.render('products', {novedades, descuentos, literatura});
    },
    
    detail: function(req, res){
        let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
        let jkRowling = productsModel.filterNProducts("J. K. Rowling", 10);
        let detail = productsModel.findBySomething(function(product){
            return product.id == req.params.idProduct;

        });

        return res.render('detail', {harryPotter, jkRowling, detail});
    }
}

module.exports = productsController;