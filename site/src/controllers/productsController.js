const productsController = {

    index: function(req, res){
        res.render("products");
    },

    detail: function(req, res){
        res.render("detail");
    }
}

module.exports = productsController;