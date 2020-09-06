const jsonModel = require('../models/jsonModel.js');
const productsModel = jsonModel('products.json');
const suscriptionsModel = jsonModel('suscriptions.json')

const { Op } = require("sequelize");
let db = require ('../database/models');

const homeController = {

    index: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15, 3);
        let stephenKing = db.Products.findAll({ 
            include:{ all: true }, 
            where: { authorId: 1}
        });
        let suspense = db.Products.findAll( { include:{ all: true }, where: {authorId: 2 }});
        let virginiaWoolf = db.Products.findAll( { include:{ all: true }, where: {authorId: 3 }});
        let quarantine = db.Products.findAll( { include:{ all: true }, where: {authorId: 4 }});

        Promise.all([stephenKing, suspense, virginiaWoolf, quarantine])
        .then(function([stephenKing, suspense, virginiaWoolf, quarantine]){
            let user = req.session.user;
            return res.render("index", {stephenKing, suspense, virginiaWoolf, quarantine, user});
        })

        
    },

    search: async function(req, res){
        let keywords = req.query.keywords;
        let products = await db.Products.findAll({
            include: ['author'],
            where: {
                [Op.or]: [
                    { "title" : {[Op.like]: '%' + keywords + '%'} },
                    { "description" : {[Op.like]: '%' + keywords + '%'}}
                ], 
            }
        })
        let authors = await db.Authors.findAll({
            where: {
                [Op.or]: [
                    { "name" : {[Op.like]: '%' + keywords + '%'} },    
                    { "lastName" : {[Op.like]: '%' + keywords + '%'} },    
                ],
            },
            include: ["products"]
        });

        let authorsProducts = authors.length > 0 ? authors.map(author => author.products) : [];

        return res.render("search", {keywords, products, authorsProducts});

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