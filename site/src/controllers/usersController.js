const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('users');
const fs = require('fs');
const path = require('path');



const usersController = {

    register: function(req, res){
        return res.render("register");
    },
    
     save: function(req, res){
          
     let user = {
        id:"",
        ...req.body,
    }
    
    let users = fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'),'utf-8');
    users = JSON.parse(users);
    //users.push(user);
     users = [...users, user];
    
    users = JSON.stringify(users, null, " ");
    
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'), users);
    
    return res.redirect('/');
    
        
        },


    login: function(req, res){
        return res.render("login");
    },

    cart: function(req, res){
        return res.render("cart");
    }
}

module.exports = usersController;