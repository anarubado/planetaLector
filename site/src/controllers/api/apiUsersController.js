let db = require('../../database/models');

const apiUsersController = {
    list: function(req, res){
        db.Users.findAll()
            .then(function(users){
                let api = {
                    meta: {
                        status: 200,
                        quantity: users.length,
                        url: req.originalUrl
                    },

                    data: {
                        users: users
                    }
                }
                res.json(api);
            })

    },

    store: function(req, res){

    },

    find: function(req, res){
        db.Users.findByPk(req.params.id)
            .then(function(user){
                let api = {
                    meta: {
                        status: 200,
                        url: req.originalUrl
                    },

                    data: {
                        user: user
                    }
                }
                res.json(api);
            })


    }




}
module.exports = apiUsersController;