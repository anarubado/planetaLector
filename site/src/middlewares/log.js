// Middleware encargado de mandar datos a la vista si el usuario esta loggeado
// Si no esta en session pero tiene una cookie, loggeara al usuario
const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");

module.exports = (req, res, next) => {
    res.locals.user = false;

    if(req.session.user){
        
        res.locals.user = req.session.user;
        return next();

    } else if (req.cookies.email){

        let user = usersModel.findBySomething(function(user){
            return user.email == req.cookies.email; // Si el usuario tiene una cookie, iniciaremos su sesion
        });
        delete user.password;

        req.session.user = user;

        res.locals.user = user;

        return next();

    } else{
        return next();
    }

}