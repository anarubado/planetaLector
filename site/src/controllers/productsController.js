const productsController = {

    index: function(req, res){
        return res.render("products");
    },

    detail: function(req, res){
        return res.render("detail");
    }
}

module.exports = productsController;