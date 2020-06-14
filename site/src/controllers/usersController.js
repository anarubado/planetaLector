const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('users');

const usersController = {

    register: function(req, res){
        return res.render("register");
    },

    login: function(req, res){
        return res.render("login");
    },

    cart: function(req, res){
        return res.render("cart");
    }
}

module.exports = usersController;