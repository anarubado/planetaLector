const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");
const productsModel = jsonModel("products.json");
const dbModel = require('../models/dbModel');

const bcryptjs = require("bcryptjs");

const { validationResult } = require("express-validator");

let db = require('../database/models');
let sequelize = db.sequelize;

const usersController = {

  register: function (req, res) {
    //let slidesProducts = productsModel.processSlideProducts(15, 3);
    let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
    return res.render("register", { harryPotter });
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
        admin: req.body.admin ? 1 : 0
      })
      
      return res.redirect("/users/login"); // No deberia estar dentro de un then?

    } else {
      let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
      return res.render("register", {errors: errors.mapped(), harryPotter, old: req.body});

    }
  },

  login: function (req, res) {
    //let slidesProducts = productsModel.processSlideProducts(15, 3);
    let jkRowling = productsModel.filterNProducts("J. K. Rowling", 10);
    return res.render("login", { jkRowling });
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
      let jkRowling = productsModel.filterNProducts("J. K. Rowling", 10);
      return res.render("login", { errors: errors.mapped(), old: req.body, jkRowling });
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
        let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 10);
        let cienciaFiccion = productsModel.filterNProducts("Ciencia ficción", 10);
        return res.render("cart", { isaacAsimov, cienciaFiccion, orderItems, total:total });
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
              productPrice: product.price,
              productImage: product.image,
              productIsbn: product.isbn,
              subTotal: product.price,
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
     // Buscar total de OrderItems por id de usuario
     db.OrderItems.sum("subTotal",{
      where: {
        userId: req.params.id
      }
    })
    .then(function(total){   
      // Crear un registro en Orders (create)
      return db.Orders.create({
        number: 1000,
        total: total,
        userId: req.params.id
 
      })
      .then(function(order){
        // Asignarle a todos los OrderItems el OrderId y status = 1 (update)
        return db.OrderItems.update({
          status: 1,
          orderId: order.number
        },{
          where: {
            userId: req.params.id
          }
        })
      })
      // Vaciar carrito? Destruir orderItems
      .then(function(){
        db.OrderItems.destroy({
          where: {
            userId: req.params.id
          }
        })
      })
      .then(function(){
        return res.redirect('/');
      })

    })

     
     

   }

};

module.exports = usersController;

