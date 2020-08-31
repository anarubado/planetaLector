const jsonModel = require('../models/jsonModel.js');
const productsModel = jsonModel('products.json');
const suscriptionsModel = jsonModel('suscriptions.json')
let db = require ('../database/models');

const homeController = {

    index: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15, 3);
        let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 5);
        let suspense = productsModel.filterNProducts("Suspenso", 5);
        let virginiaWoolf = productsModel.filterNProducts("Virginia Woolf", 5);
        let quarantine = productsModel.filterNProducts("Autoayuda", 5);

        let user = req.session.user;

        return res.render("index", {isaacAsimov, suspense, virginiaWoolf, quarantine, user});
    },

    search: function(req, res){
        let keywords = req.query.keywords;
        let products = productsModel.search(keywords);
        return res.render("search", {keywords, products});
    },
    
    suscribe: function(req, res){
        let suscription = req.body.email;
        suscriptionsModel.saveOne(suscription);

        res.redirect('/');
    },

    success: function(req, res){
        // Buscar total de OrderItems por id de usuario        
        db.OrderItems.sum("subTotal",{
            where: {
                userId: req.session.user.id
            }
        })
        .then(function(total){   
            // Crear un registro en Orders (create)
            return db.Orders.create({
                number: 1000,
                total: total,
                userId: req.session.user.id
            })
            .then(function(order){
                // Asignarle a todos los OrderItems el OrderId y status = 1 (update)
                return db.OrderItems.update({
                    status: 1,
                    orderId: order.number
                },{
                    where: {
                    userId: req.session.user.id
                    }
                })
            })
            // Vaciar carrito? Destruir orderItems
            .then(function(){
                db.OrderItems.destroy({
                    where: {
                        userId: req.session.user.id
                    }
                })
            })
            .then(function(){
                return res.render('checkout/success');  
            })
        })

    },

    novedades: function(req, res){
        db.Products.findAll(
            {   include:{all:true},
                order: [['createdAt', 'DESC']], limit:12
            }
            )
            .then(function(products){
            return res.render('news',{products})
            })
    }
}

module.exports = homeController;