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
      });     
      
      return res.redirect("/users/login");

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
    //let slidesProducts = productsModel.processSlideProducts(15, 3);
    let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 10);
    let cienciaFiccion = productsModel.filterNProducts("Ciencia ficción", 10);
    return res.render("cart", { isaacAsimov, cienciaFiccion });
  },

  addToCart: function(req, res){
    // Deberia fijarme que el usuario este en session
    if (req.session.user){
      // Identificar el producto en la db       
      db.Products.findOne({
        where: {id: req.params.id}
      })
      .then(function(product){
        return product.dataValues;
      })

      .then(function(product){
        db.CartItems.create({
          userId: req.session.user.id,
          productId: product.id
        })
        .then(function(newItem){
          return res.redirect('/cart');
        })
      })      

    } else{
      // Si no hay nadie en session, lo redirijimos a login
      return res.redirect('/users/login');
    }

  },

  deleteFromCart: function(req, res){

  }
};

module.exports = usersController;
