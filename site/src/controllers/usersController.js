const usersController = {

    register: function(req, res){
        res.render("register");
    },

    login: function(req, res){
        res.render("login");
    },

    cart: function(req, res){
        res.render("cart");
    }
}

module.exports = usersController;