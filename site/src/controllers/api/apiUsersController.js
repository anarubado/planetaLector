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
                        users: users.map(function(user){
                            return ({
                                id: user.id,
                                username: user.username,
                                email: user.email
                            })
                        })
                    }
                }
                res.json(api);
            })

    },

    store: function(req, res){
        db.Users.create({})

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
                        user: {
                            id: user.id,
                            admin: user.admin,
                            username: user.username,
                            email: user.email
                        }
                    }
                }
                res.json(api);
            })


    }




}
module.exports = apiUsersController;