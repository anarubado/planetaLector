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

      /* let user = {
        id: usersModel.generateId(),
        ...req.body,
        image: req.file ? req.file.filename : 'default-image.jpg',
      };

      usersModel.saveOne(user);

      return res.redirect("/users/login");*/

      // En caso de haber errores se muestran en pantalla

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
      //LOGUEO AL USUARIO
      //let user = usersModel.findBySomething(user => user.email == req.body.email);
      db.Users.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(function(user){

        delete user.dataValues.password; // o guarda la contraseña en session

        req.session.user = user.dataValues; // YA ESTA EN SESSION

        if (req.body.recordame) {
          // Creo la cookie
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
    db.User.findAll()
    .then(function(resultados){
      return res.render('prueba', {resultados:resultados})
    })
  },

  addToCart: function(req, res){

    // Deberia fijarme que el usuario este en session
    if (req.session.user){
      
      // Cuando este en session, identificarlo con su id en la base de datos
      db.User.findOne({
        where: {email: req.session.user.email} // En el model no esta el id
      })
      .then(function(user){

        // Identificar el producto en la db 
        return db.Product.findOne({
          where: {id: req.params.id} // En el model no esta el id
  
        })
        
      })
      .then(function(product){
        let userFound = user;  
        let productFound = product;

        // Hacer un INSERT INTO en la tabla cartItems
        //return sequelize.query("INSERT INTO cartItems VALUES " + "(" + 1 + "," req.session.user.id, productFound.id)"); // create
          
      })    
      .then((itemNuevo) => {
        return res.redirect('/cart')
      })  
      
      return res.send("llegue");

    } else{

      // Si no hay nadie en session, lo redirijimos a login
      res.redirect('/users/login');
    }

  },

  deleteFromCart: function(req, res){

  }
};

module.exports = usersController;
