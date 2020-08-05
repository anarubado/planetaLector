const jsonModel = require('../models/jsonModel.js');
const productsModel = jsonModel('products.json');

const auth =  {

    // Con session -> no puedan acceder a iniciar sesion y registrarse
    user: function(req, res, next){
        if (req.session.user){
            return res.redirect('/');
        }
        return next();
    },

    // Sin session -> no puedan accerder al carrito
    guest: function(req, res, next){
        if (req.session.user){
            return next();    
        }
        return res.redirect('/users/login');
    }  
}

module.exports = auth;