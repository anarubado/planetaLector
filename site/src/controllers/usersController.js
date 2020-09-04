const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");
const productsModel = jsonModel("products.json");

const bcryptjs = require("bcryptjs");
const mercadopago = require('mercadopago');

const { validationResult } = require("express-validator");

let db = require('../database/models');
let sequelize = db.sequelize;

const usersController = {

  register: function (req, res) {

    db.Products.findAll({ 
      include:{ all: true }, 
      where: { authorId: 1}
    })
    .then(function(harryPotter){
      return res.render("register", { harryPotter });
    })

  },

  processRegister: function (req, res) {
    let errors = validationResult(req);

    // Si no hay errores, registro al usuario
    if (errors.isEmpty()) {
      
      delete req.body.retype;
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      
      db.Users.create({
        username: req.body.username,
        email:req.body.email,
        image: req.file ? req.file.filename : 'default-image.jpg',
        password: req.body.password,
        admin: 0
      })
      
      return res.redirect("/users/login"); // No deberia estar dentro de un then?

    } else {
      db.Products.findAll({ 
        include:{ all: true }, 
        where: { authorId: 1}
      })
      .then(function(harryPotter){
        return res.render("register", { errors: errors.mapped(), harryPotter, old: req.body });
      })
      
    }
  },

  login: function (req, res) {
    db.Products.findAll({ 
      include:{ all: true }, 
      where: { authorId: 1}
    })
    .then(function(jkRowling){
      return res.render("login", { jkRowling });
    })
    
  },

  processLogin: function (req, res) {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      db.Users.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(function(user){
        delete user.dataValues.password; // No guarda la contraseña en session

        req.session.user = user.dataValues; // Ya esta en session

        if (req.body.recordame) {
          res.cookie('email', user.email, { maxAge: 1000 * 60 * 60 * 24 }); // Manda al navegador la cookie 
        }

        return res.redirect('/');

      })
      
    } else {
      db.Products.findAll({ 
        include:{ all: true }, 
        where: { authorId: 1}
      })
      .then(function(jkRowling){
        return res.render("login", { errors: errors.mapped(), jkRowling, old: req.body });
      })
      
    }
  },

  logout: function(req,res) {
    // Desloguea al usuario
    req.session.destroy();

    if(req.cookies.email){
      res.clearCookie('email');    }

    return res.redirect('/');
  },

  cart: function (req, res) {
    db.OrderItems.findAll({
      where: {
        userId: req.session.user.id
      }
    })
    .then(function(orderItems){
      db.OrderItems.sum("subTotal",{
        where: {
          userId: req.session.user.id
        }
      })
      .then(function(total){
        let isaacAsimov = db.Products.findAll({ 
          include:{ all: true }, 
          where: { authorId: 1}
        });

        let cienciaFiccion = db.Products.findAll({ 
            include:{ all: true }, 
            where: { authorId: 1}
        });

      Promise.all([isaacAsimov, cienciaFiccion])
        .then(function([isaacAsimov, cienciaFiccion]){
          return res.render("cart", { isaacAsimov, cienciaFiccion, orderItems, total:total });
        })
      })
    })
    
  },

  addToCart: function(req, res){
    // Deberia fijarme que el usuario este en session
    if (req.session.user){
      // Si lo esta, busco un orderItem que cuyo productId y userId coincidan con nuestro usuario y el producto seleccionado
      db.OrderItems.findOne({
        where: {
          userId: req.session.user.id,
          productId: req.params.id          
        }
      })
      .then(function(orderItem){
        // Si esta, aumentar la quantity en 1 con un update
        if(orderItem){
          db.OrderItems.update({
            productQuantity: orderItem.productQuantity + 1,
            subTotal: orderItem.productPrice * (orderItem.productQuantity + 1)
          },{
            where:{
              userId: req.session.user.id,
              productId: req.params.id
            }
          })
          .then(function(orderItem){
            return res.redirect('/users/cart');
          })   
                 

        } else{
          // Sino, identificar producto en la db y crear orderItem con quantity 1      
          db.Products.findOne({
            where: {id: req.params.id},
            include: {
              all: true
            }
          })
          .then(function(product){
            return product.dataValues;
          })
          .then(function(product){
            // Busco en OrderItems si el productId coincide con el req.params.id
            db.OrderItems.create({
              userId: req.session.user.id,
              productId: product.id,
              productName: product.title,
              productAuthor: product.author.name + ' ' + product.author.lastName, // author viene del alias del modelo
              productEditorial: product.editorial.name, // editorial viene del alias del modelo
              productQuantity: 1,
              productPrice: product.discount != null ? product.price - product.discount / 100 * product.price : product.price,
              productImage: product.image,
              productIsbn: product.isbn,
              subTotal: product.discount != null ? product.price - product.discount / 100 * product.price : product.price,
              status: 0,
              orderId: null
            })
            .then(function(orderItem){
              return res.redirect('/users/cart');
            })           
            
          }) 
          
        }
      })
    } else{
      // Si no hay nadie en session, lo redirijimos a login
      return res.redirect('/users/login');
    }

  },


  deleteFromCart: function(req, res){
    // Hay que borrar primero las relaciones y luego el registro!!
    // console.log(req.session.user)
    db.OrderItems.destroy({
      where: {
        userId: req.session.user.id,
        id: req.params.id
      }
    })

    .then(function(orderItem){
      return res.redirect('/users/cart');
    })
  },


  profile: function (req,res) {
     //Preguntar si está logueado
      db.Users.findByPk(req.session.user.id)
      .then(function(user){
        return res.render('profile', {user})
      })
   },

   editProfile: function (req,res) {
    let errors = validationResult(req);
    // habria que destruir la cookie con el email viejo si cambiamos el email

    if (errors.isEmpty()){
      db.Users.findByPk(req.params.id)
      .then(function(user){
        return db.Users.update ({
          username: req.body.username,
          email: req.body.email,
          //password: req.body.newPassword != "" ? bcryptjs.hashSync(req.body.newPassword, 10) : user.password
        }, {where: {
          id: req.params.id}
         })
         
       
      })
      .then(()=>{
        req.session.user.username = req.body.username;
        return res.redirect('/'); 
      })
      

    } else{
      return res.render('profile', {errors: errors.mapped(), old: req.body} )
    } 
      
   },

   password: function(req, res){

    db.Users.findByPk(req.session.user.id)
    .then(function(user){
      return res.render('password', {user})
    })
   },

   editPassword: function(req, res){
    let errors = validationResult(req);
    // habria que destruir la cookie con el email viejo si cambiamos el email

    if (errors.isEmpty()){
      db.Users.findByPk(req.params.id)
      .then(function(user){
        return db.Users.update ({
          password: req.body.newPassword != "" ? bcryptjs.hashSync(req.body.newPassword, 10) : user.password
        }, {where: {
          id: req.params.id}
         })
         
       
      })
      .then(()=>{
        return res.redirect('/'); 
      })
      

    } else{
      return res.render('password', {errors: errors.mapped(), old: req.body} )
    }

   },

   checkout: function(req, res){
     // Recopilar la info pertinente para las preferences de MP.
     db.OrderItems.findAll({
       where: {
         userId: req.params.id
       }
     })
     .then(function(orderItems){
       let items = [];
       orderItems.forEach(orderItem => {
         let item = {
           title: orderItem.productName,
           unit_price: orderItem.productPrice,
           quantity: orderItem.productQuantity
         }
        items.push(item);         
       })
       return items;
     })
     .then(function(items){
      // Configuracion de TOKEN
      mercadopago.configure({
        access_token: "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
        integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
      });

      // Configuracion de preferences
      let preference = {
        items: items,
        payer: {
          email: "test_user_63274575@testuser.com"
        },
        back_urls: {
          success: "http://localhost:3030/success",
          failure: "http://localhost:3030/failure",
          pending: "http://localhost:3030/pending"
      },
        auto_return: "approved"
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        return res.redirect(response.body.init_point);
      })
      .catch(function(error){
        console.log(error);
      })
     })
   },

   create: function(req, res){
     return res.render('admin/users/create');
   },

   save: function(req, res){
    let errors = validationResult(req);

    // Si no hay errores, creo al usuario
    if (errors.isEmpty()) {
      
      delete req.body.retype;
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      
      db.Users.create({
        username: req.body.username,
        email: req.body.email,
        image: req.file ? req.file.filename : 'default-image.jpg',
        password: req.body.password,
        admin: req.body.admin ? 1 : 0
      })
      .then(function(){

        return res.redirect("/users/list");
      })
      
      

    } else {
      return res.render("admin/users/create", {errors: errors.mapped(), old: req.body});

    }
     
   },

   list: function(req, res){
    db.Users.findAll({
        include: {
            all: true
        }
    })
    .then(function(users){
        let details = users.map(user => {
            return ({
                id: user.id,
                username: user.username,
                email: user.email
            })               
        });
        //return res.send(details)
        return res.render('admin/users/list', {details: details});            

    })
        
    },

    delete: function(req, res){
      db.Users.destroy({
          where:{
              id: req.params.id
          }
      })
      .then(function(){
        return res.redirect('/users/list');
      })
      
  },

  edit: function(req, res){
    db.Users.findByPk(req.params.id)
      .then(function(user){
        return res.render('admin/users/edit', {user: user} )
      })
  },

  processEdit: function(req, res){
    db.Users.update({
      username: req.body.username,
      email: req.body.email,
      //image: 
      admin: req.body.admin ? 1 : 0
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(function(){
      req.session.user.username = req.body.username;
      return res.redirect('/users/list')
    })
  }



};

module.exports = usersController;

