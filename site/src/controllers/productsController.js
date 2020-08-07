const jsonModel = require('../models/jsonModel');
const productsModel = jsonModel('products.json');
const dbModel = require ('../models/dbModel');
let db = require ('../database/models');
let sequelize = db.sequelize

const { validationResult } = require("express-validator");

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
        let pedidoAuthor = db.Authors.findAll()
        let pedidoEditorial = db.Editorials.findAll()
        let pedidoCovertype = db.CoverTypes.findAll()
        let pedidoFormatype = db.FormatTypes.findAll()
        
      
        Promise.all([pedidoProducto, pedidoCategory, pedidoSubCategory, pedidoAuthor, pedidoEditorial, pedidoCovertype, pedidoFormatype])
            //console.log(product);
            .then(function([product, category, subCategory, author, editorial, coverType, formatType]){
                return res.render('editProduct',{product, category, subCategory, author, editorial, coverType, formatType})
            })
            
    },
    update: function(req,res) {
        db.Products.update ({
            title: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            isbn: req.body.isbn,
            numberPages: req.body.paginas,
            image: req.body.image,
            authorId: req.body.autores,
            categoryId: req.body.category,
            subCategoryId: req.body.subCategory,
            editorialId: req.body.editorial,
            coverTypeId: req.body.coverType,
            formatTypeId: req.body.formatType

            //authorId: req.body.autores
        }, {
            where: {
                id:req.params.idProduct
            }
        });
        /*db.Authors.update ({
            name: req.body.name,
            lastName: req.body.lastName
        },{
            where: {
                id:req.params.idProduct
            }
        });*/
        return res.redirect('/');
        
        
    },

    delete: function(req, res){
        db.Products.destroy({
            where:{
                id: req.params.idProduct
            }
        })
        return res.redirect('/');
    },
    create: function(req,res){
        let pedidoCovertype = db.CoverTypes.findAll()
        let pedidoFormatype = db.FormatTypes.findAll()
        Promise.all([pedidoCovertype,pedidoFormatype])
            //console.log(product);
            .then(function([coverType,formatType]){
                return res.render('crearProducto',{coverType,formatType})
            })
    },

    save: function(req,res){
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Products.create({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                isbn: req.body.isbn,
                numberPages: req.body.pages,
                //image: req.file...,
                // categoryId: req.body.category,
                // subCategoryId: req.body.subCategory,
                // authorId: req.body.autores,
                // editorialId: req.body.editorial,
                image: req.file ? req.file.filename : 'default-image.jpg',
                categoryId: null,
                subCategoryId: null,
                authorId: null,
                editorialId: null,
                coverTypeId: req.body.coverType,
                formatTypeId: req.body.formatType       
                          
                
            })
            return res.redirect('/');

        } else{
            return res.render('createProduct', {errors: errors.mapped()});
        }

        
    }
}

module.exports = productsController;