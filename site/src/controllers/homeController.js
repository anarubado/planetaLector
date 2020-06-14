const jsonModel = require('../models/jsonModel');
const homeModel = jsonModel('products');

const homeController = {

    index: function(req, res){
        return res.render("index");
    },

    search: function(req, res){
        return res.render("search");
    }
}

module.exports = homeController;