const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('users.json');
const productsModel = jsonModel('products.json');
const fs = require('fs');
const path = require('path');



const usersController = {

    register: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15, 3);
        let harryPotter = productsModel.filterNProducts("Harry Potter", 10);
        return res.render("register", {harryPotter});
    },

    save: function(req, res){
        let user = {
            id:"",
            ...req.body,
        }

        let usuarios = fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'),'utf-8');
        usuarios = JSON.parse(usuarios);
        //usuarios.push(user);

        usuarios = [...usuarios, user];

        usuarios = JSON.stringify(usuarios, null, " ");
    
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'), usuarios);
        
        return res.redirect('/');

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