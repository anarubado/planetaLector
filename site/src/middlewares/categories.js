const db = require("../database/models");

function listadoCategories(req,res,next) {
    db.Categories.findAll()
    .then(function (categories){
        res.locals.categories = categories
        return next()
    }) 
}

module.exports = listadoCategories;