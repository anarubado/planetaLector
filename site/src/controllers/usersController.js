const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('users.json');
const productsModel = jsonModel('products.json');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')



const usersController = {

    register: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15, 3);
        let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
        return res.render("register", {harryPotter});
    },

    save: function(req, res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
        // Encripto clave de usuarios
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
        let user = {
            id:"",
            ...req.body,
        }
       /* usersModel.guardarUno(user);
        return res.redirect('/');*/
       // Leer JSON
        let usuarios = fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'),'utf-8');
        usuarios = JSON.parse(usuarios);
        
        
    
        // Agrego la data
        usuarios = [...usuarios, user];

        // Guardo la data
        usuarios = JSON.stringify(usuarios, null, " ");
    
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'), usuarios);
        
        return res.redirect('/');
    }else{
        // En caso de haber error lo muestre por pantalla
        return res.render('register', {errors: errors.mapped()})
    }

    },


    login: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15, 3);
        let jkRowling = productsModel.filterNProducts("J. K. Rowling", 10);
        return res.render("login", {jkRowling});
    },

    cart: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15, 3);
        let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 10);
        let cienciaFiccion = productsModel.filterNProducts("Ciencia ficción", 10)
        return res.render("cart", {isaacAsimov, cienciaFiccion});
    }
}

module.exports = usersController;