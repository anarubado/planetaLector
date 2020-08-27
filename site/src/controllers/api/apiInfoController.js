let db = require('../../database/models');

const apiInfoController = {
    list: function(req, res){
        let products = db.Products.findAll();
        let lastProduct = db.Products.findOne({
            order: [[ 'createdAt', 'DESC' ]]

        });
        let orders = db.Orders.sum('total');
        let categories = db.Categories.findAll();
        let users = db.Users.findAll();

        Promise.all([products, lastProduct, orders, categories, users])
            .then(function([products, lastProduct, orders, categories, users]){

                let api = {
                    meta: {
                        status: 200,
                        url: req.originalUrl
                    },

                    data: {

                        metrics: [
                            {
                                title: "Products in Database",
                                value: products.length
                            },
                            {
                                title: "Amount in Products",
                                value: orders
                            },
                            {
                                title: "Users quantity",
                                value: users.length
                            }

                        ],

                        lastProduct: {
                            title: lastProduct.title,
                            description: lastProduct.description,
                            image: lastProduct.image
                        },
                        categories: categories                 
                        
                    }
                }
                res.json(api);
                
            })

    } 
}

module.exports = apiInfoController;