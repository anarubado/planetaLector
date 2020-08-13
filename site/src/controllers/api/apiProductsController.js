let db = require('../../database/models');

const apiProductsController = {
    list: function(req, res){
        db.Products.findAll({
            include: { all: true}
        })
            .then(function(products){

                products.map(product => {
                    return product = 
                    {
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
                        //coverType: product.coverType.type,
                        //formatType: product.formatType.type
                        
                    }                    
                    
                });

                let api = {
                    meta: {
                        status: 200,
                        quantity: products.length,
                        url: req.originalUrl
                    },

                    data: {
                        
                        products: products
                    }
                }
                res.json(api);
                
            })

    },

    store: function(req, res){

    },

    find: function(req, res){

    },

    



}

module.exports = apiProductsController;