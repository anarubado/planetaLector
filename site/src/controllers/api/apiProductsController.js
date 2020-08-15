let db = require('../../database/models');

const apiProductsController = {
    list: function(req, res){
        db.Products.findAll({
            include: { all: true}
        })
            .then(function(products){

                let api = {
                    meta: {
                        status: 200,
                        quantity: products.length,
                        url: req.originalUrl
                    },

                    data: {
                        
                        products: products.map(product => {
                            return ({
                                id: product.id,
                                title: product.title,
                                description: product.description,
                                price: product.price,
                                stock: product.stock,
                                isbn: product.isbn,
                                numberPages: product.numberPages,
                                image: product.image,
                                category: product.category.title, 
                                subCategory: product.subCategory.title,
                                author: product.author.name + ' ' + product.author.lastName,
                                editorial: product.editorial.name,
                                coverType: product.coverType.type,
                                formatType: product.formatType.type
                                
                            })                   
                            
                        })
                    }
                }
                res.json(api);
                
            })

    },

    store: function(req, res){

    },

    find: function(req, res){
        db.Products.findByPk(req.params.id, {
            include: { all: true}
        })
            .then(function(product){
                console.log(product);
                let api = {
                    meta: {
                        status: 200,
                        url: req.originalUrl
                    },

                    data: {
                        product: {
                            id: product.id,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            stock: product.stock,
                            isbn: product.isbn,
                            numberPages: product.numberPages,
                            image: product.image,
                            category: product.category.title, 
                            subCategory: product.subCategory.title,
                            author: product.author.name + ' ' + product.author.lastName,
                            editorial: product.editorial.name,
                            coverType: product.coverType.type,
                            formatType: product.formatType.type
                        }
                    }
                }
                res.json(api);
            })

    },

    



}

module.exports = apiProductsController;