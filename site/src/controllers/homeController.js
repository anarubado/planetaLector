const homeController = {

    index: function(req, res){
        return res.render("index");
    },

    search: function(req, res){
        return res.render("search");
    }
}

module.exports = homeController;