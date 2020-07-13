const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");
const productsModel = jsonModel("products.json");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
let db = require('../database/models')
let sequelize = db.sequelize


const usersController = {
  register: function (req, res) {
    //let slidesProducts = productsModel.processSlideProducts(15, 3);
    let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
    return res.render("register", { harryPotter });
  },

  processRegister: function (req, res) { 
     
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      // Encripto clave de usuarios
      delete req.body.retype;
      req.body.password = bcryptjs.hashSync(req.body.password, 10);

      let user = {
        id: "",
        ...req.body,
        image: req.file.filename,
      };

      usersModel.saveOne(user);

      return res.redirect("/");
    } else {
      // En caso de haber error lo muestre por pantalla
      let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
      return res.render("register", {
        errors: errors.mapped(),
        harryPotter,
        old: req.body,
      });
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
      //LOGUEO AL USUARIO
      let user = usersModel.findBySomething(user => user.email == req.body.email);

      delete user.password;

      req.session.user = user; // YA ESTA EN SESSION

      if (req.body.recordame) {
        // Creo la cookie
        res.cookie('email', user.email, { maxAge: 1000 * 60 * 60 * 24 });
      }

      return res.redirect('/')
    } else {
      let jkRowling = productsModel.filterNProducts("J. K. Rowling", 10);
      return res.render("login", { errors: errors.mapped(), old:req.body, jkRowling });
    }
  },

  logout: function(req,res) {

    // Desloguear al usuario

    req.session.destroy();

    if(req.cookies.email){
      res.clearCookie('email');
    }

    return res.redirect('/');
  },

  cart: function (req, res) {
    //let slidesProducts = productsModel.processSlideProducts(15, 3);
    let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 10);
    let cienciaFiccion = productsModel.filterNProducts("Ciencia ficción", 10);
    return res.render("cart", { isaacAsimov, cienciaFiccion });
  },

  prueba: function(req, res){
   /* sequelize.query('SELECT * FROM USERS')
    .then(function(resultado){
      let users = resultado[0];
      return res.render('prueba', {users: users})
    })*/
    db.Users.findAll()
    .then(function(resultados){
      return res.render('prueba', {resultados:resultados})
    })
  }
};

module.exports = usersController;
