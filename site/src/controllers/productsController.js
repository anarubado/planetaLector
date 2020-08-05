const jsonModel = require('../models/jsonModel');
const productsModel = jsonModel('products.json');
const dbModel = require ('../models/dbModel');
let db = require ('../database/models');
let sequelize = db.sequelize

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
    }, 
    edit: function(req, res){
        let pedidoProducto = db.Products.findByPk(req.params.idProduct, {include: {
              all: true
            }})
        let pedidoCategory = db.Categories.findAll()
        let pedidoSubCategory = db.SubCategories.findAll()
      
        Promise.all([pedidoProducto,pedidoCategory,pedidoSubCategory])
            //console.log(product);
            .then(function([product,category,subCategory]){
                console.log(category);
                return res.render('editarProducto',{product,category,subCategory})
            })
            
    },
    update: function() {
        //let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
        //let jkRowling = productsModel.filterNProducts("J. K. Rowling", 10);
        
    }
}

module.exports = productsController;