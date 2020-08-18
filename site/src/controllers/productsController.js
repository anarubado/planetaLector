const jsonModel = require('../models/jsonModel');
const productsModel = jsonModel('products.json');
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
        let product = db.Products.findByPk(req.params.idProduct, {include: {
              all: true
            }})
        let categories = db.Categories.findAll()
        let subCategories = db.SubCategories.findAll()
        let authors = db.Authors.findAll()
        let editorials = db.Editorials.findAll()
        let coverTypes = db.CoverTypes.findAll()
        let formatTypes = db.FormatTypes.findAll()
        
      
        Promise.all([product, categories, subCategories, authors, editorials, coverTypes, formatTypes])
            .then(function([product, categories, subCategories, authors, editorials, coverTypes, formatTypes]){
                return res.render('admin/products/edit',{product, categories, subCategories, authors, editorials, coverTypes, formatTypes})
            })
            
    },

    update: function(req,res) {
        db.Products.update ({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            isbn: req.body.isbn,
            numberPages: req.body.numberPages,
            //image: req.file ? req.file.filename : 'default-image.jpg',
            authorId: req.body.author,
            categoryId: req.body.category,
            subCategoryId: req.body.subCategory,
            editorialId: req.body.editorial,
            coverTypeId: req.body.coverType,
            formatTypeId: req.body.formatType
        }, {
            where: {
                id: req.params.idProduct
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
        .then(function(){
            return res.redirect('/products/list');

        })
        
    },

    create: function(req,res){
        let authors = db.Authors.findAll();
        let categories = db.Categories.findAll();
        let subCategories = db.SubCategories.findAll();
        let editorials = db.Editorials.findAll();
        let coverTypes = db.CoverTypes.findAll();
        let formatTypes = db.FormatTypes.findAll();

        Promise.all([authors, categories, subCategories, editorials, coverTypes, formatTypes])
            .then(function([authors, categories, subCategories, editorials, coverTypes,formatTypes]){
                return res.render('admin/products/create', {authors, categories, subCategories, editorials, coverTypes, formatTypes});
            })
    },

    save: function(req, res){
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Products.create({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                isbn: req.body.isbn,
                numberPages: req.body.numberPages,
                //image: req.file ? req.file.filename : 'default-image.jpg',
                authorId: req.body.author,
                categoryId: req.body.category,
                subCategoryId: req.body.subCategory,
                editorialId: req.body.editorial,
                coverTypeId: req.body.coverType,
                formatTypeId: req.body.formatType
            })
            .then(function(){
                return res.redirect('/products/list');

            })
    
            

        } else{
            let authors = db.Authors.findAll();
            let categories = db.Categories.findAll();
            let subCategories = db.SubCategories.findAll();
            let editorials = db.Editorials.findAll();
            let coverTypes = db.CoverTypes.findAll();
            let formatTypes = db.FormatTypes.findAll();

            Promise.all([authors, categories, subCategories, editorials, coverTypes, formatTypes])
                .then(function([authors, categories, subCategories, editorials, coverTypes,formatTypes]){
                    return res.render('admin/products/create',{authors, categories, subCategories, editorials, coverTypes, formatTypes, errors: errors.mapped(), old: req.body});
                });
        }

        

        
    },

    list: function(req, res){
        db.Products.findAll({
            include: {
                all: true
            }
        })
        .then(function(products){
            let details = products.map(product => {
                return ({
                    id: product.id,
                    title: product.title,
                    author: product.author.name + " " + product.author.lastName
                })               
            });
            return res.render('admin/products/list', {details: details});            

        })
            
    }
}

module.exports = productsController;