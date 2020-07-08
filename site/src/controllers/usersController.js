const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");
const productsModel = jsonModel("products.json");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersController = {
  register: function (req, res) {
    //let slidesProducts = productsModel.processSlideProducts(15, 3);
    let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
    return res.render("register", { harryPotter });
  },

  processRegister: function (req, res){

    let errors = validationResult(req);
    
    if(errors.isEmpty()) {
      // Encripto clave de usuarios
      delete req.body.retype;
      req.body.password = bcryptjs.hashSync(req.body.password, 10);

      let user = {
        id: "",
        ...req.body,
        image: req.file.filename
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

  processLogin: function (req,res) {

    let errors = validationResult(req);    
   
    if (errors.isEmpty()) {
      let usersJSON = fs.readFileSync(path.join(__dirname, "..", "data", "users.json"), "utf-8");
      let users;

      if (usersJSON == '') {
          users = [];
      } else {
          users = JSON.parse(usersJSON);
      }

      for (let i = 0; i<users.length; i++) {
          if (users[i].user == req.body.user) {
              if (bcryptjs.compareSync(req.body.password, users [i].password)) {
                //usuarioALoguearse is not defined 
                  var usuarioALoguearse = users [i]
                  break;
              }
          }
      }
      if (usuarioALoguearse == undefined) {
          return res.render ('login', 
              { errors:'credenciales invalids'})
      }

      req.session.usuarioLogueado = usuarioALoguearse;

      //if (req.body.recordame != undefined) {
          //res.cookie ('recordame', usuarioALoguearse.user, {maxAge: 60000})
      //}

    let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 10);
    let suspense = productsModel.filterNProducts("suspense", 10);
    let virginiaWoolf = productsModel.filterNProducts("Virginia Woolf", 10);
    let quarantine = productsModel.filterNProducts("quarantine", 10);
    
    return res.render("index", {isaacAsimov, suspense, virginiaWoolf, quarantine});

  } else {
    
    let jkRowling = productsModel.filterNProducts("J. K. Rowling", 10);
    return res.render("login", { errors: errors.mapped(), jkRowling });
  }

  },

  cart: function (req, res) {
    //let slidesProducts = productsModel.processSlideProducts(15, 3);
    let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 10);
    let cienciaFiccion = productsModel.filterNProducts("Ciencia ficción", 10);
    return res.render("cart", { isaacAsimov, cienciaFiccion });
  },
};

module.exports = usersController;
