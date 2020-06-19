const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('users.json');
const productsModel = jsonModel('products.json');
const fs = require('fs');
const path = require('path');



const usersController = {

    register: function(req, res){
        let slidesProducts = productsModel.processSlideProducts(15, homeModel.getNItemsSlide());
        return res.render("register", {slidesProducts});
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
        let slidesProducts = productsModel.processSlideProducts(15, homeModel.getNItemsSlide());
        return res.render("login", {slidesProducts});
    },

    cart: function(req, res){
        let slidesProducts = productsModel.processSlideProducts(15, homeModel.getNItemsSlide());
        return res.render("cart", {slidesProducts});
    }
}

module.exports = usersController;