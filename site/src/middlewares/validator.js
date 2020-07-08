const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('users.json');
const path = require('path');
const { body } = require("express-validator");
const bcryptjs = require("bcryptjs");

const validator = {

    register: [

        body("user")
          .notEmpty()
          .withMessage("*Este Campo es obligatorio")
          .bail()
          .isLength({ min: 3 })
          .withMessage("El usuario debe tener como minimo 3 caracteres")
          .bail()
          .custom((value) => {
            let user = usersModel.findBySomething((user) => user.user == value);
            return !user;
          })
          .withMessage("Usuario ya registrado"),

        body("image")
          .custom(function(value, {req}){
              return req.file;
          })
          .withMessage("Imagen requerida")          
          .bail()
          .custom(function(value, {req}){

            let acceptedExt = ['.jpg', '.png', '.jepg'];
            let ext = path.extname(req.file.originalname);

            return acceptedExt.includes(ext);
          })
          .withMessage("Extension invalida"),
          

        body("email")
          .notEmpty()
          .withMessage("*Este campo es obligatorio")
          .isEmail()
          .withMessage("*El campo debe ser un email")
          .custom((value) => {
            let user = usersModel.findBySomething((user) => user.email == value);
    
            return !user;
          })
          .withMessage("Email ya registrado"),
    
           
        body("password")
          .notEmpty()
          .withMessage("*Este Campo es obligatorio")
          .isLength({ min: 8 })
          .withMessage("La contraseña debe tener como minimo 8 caracteres")
    ],

    login: [
        body ('email')
        .notEmpty()
        .withMessage("*Este Campo es obligatorio")
        .custom((value, {req}) => {
          let user = usersModel.findBySomething((user) => user.email == value);
      
          if (user){
              let validation = bcryptjs.compareSync(req.body.password, user.password);
              return validation;
          }
          return false;
        })
        .withMessage("Email o contraseña invalida"),

        body("password")
        .notEmpty()
        .withMessage("El campo es obligatorio")
      ]

}

module.exports = validator;