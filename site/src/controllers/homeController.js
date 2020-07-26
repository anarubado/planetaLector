const jsonModel = require('../models/jsonModel.js');
const productsModel = jsonModel('products.json');
const suscriptionsModel = jsonModel('suscriptions.json')

const homeController = {

    index: function(req, res){
        //let slidesProducts = productsModel.processSlideProducts(15, 3);
        let isaacAsimov = productsModel.filterNProducts("Isaac Asimov", 5);
        let suspense = productsModel.filterNProducts("Suspenso", 5);
        let virginiaWoolf = productsModel.filterNProducts("Virginia Woolf", 5);
        let quarantine = productsModel.filterNProducts("Autoayuda", 5);

        let user = req.session.user;

        return res.render("index", {isaacAsimov, suspense, virginiaWoolf, quarantine, user});
    },

    search: function(req, res){
        let keywords = req.query.keywords;
        let products = productsModel.search(keywords);
        return res.render("search", {keywords, products});
    },
    
    suscribe: function(req, res){
        let suscription = req.body.email;
        suscriptionsModel.saveOne(suscription);

        res.redirect('/');
    }
}

module.exports = homeController;