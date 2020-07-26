const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");
const productsModel = jsonModel("products.json");

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
        password: req.body.password
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
    console.log('OTRO REGISTRO')
    sequelize.query('SET FOREIGN_KEY_CHECKS=0;')
    .then(function(result){
      return db.OrderItems.destroy({
        where: {
          userId: req.session.user.id,
          productId: req.params.id
        }
      })
    })
    .then(function(result){
      return sequelize.query('SET FOREIGN_KEY_CHECKS=1;')
    })
    .then(function(result){
      return res.redirect('/users/cart');
    })
  },
  perfil: function (req,res) {
     //Preguntar si está logueado
      db.Users.findByPk (req.session.user.id)
      .then (function (resultado){
        return res.send (resultado)
        return res.render ('perfil', {user:resultado})
      })
   }

};

module.exports = usersController;

