const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('users.json');
const path = require('path');
const { body } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require('../database/models');
// const {Users} = require('../database/models'); // reemplazar db

const validator = {

    register: [

        body("username")
          .notEmpty()
          .withMessage("*Este Campo es obligatorio")
          .bail()
          .isLength({ min: 3 })
          .withMessage("*El usuario debe tener como mínimo 3 caracteres")
          .bail()
          .custom((value) => {

            let respuesta = db.Users.findOne({
              where: {username: value}
            })
            .then(function(result){
              if(result){
                return Promise.reject('Usuario ya registrado');
              }
            });
            return respuesta;
          }),                

        body("email")
          .notEmpty()
          .withMessage("*Este campo es obligatorio")
          .bail()
          .isEmail()
          .withMessage("*El campo debe ser un email")
          .bail()
          .custom((value) => {

            let respuesta = db.Users.findOne({
              where: {email: value}
            })
            .then(function(result){
              if(result){
                return Promise.reject('Email ya registrado');
              }
            });
            return respuesta;
            
            //let user = usersModel.findBySomething((user) => user.email == value);    
            //return !user;
          })
          .withMessage("El email ya esta registrado"),

        body("image")
          .custom(function(value, {req}){
            if (req.file){

              let acceptedExt = ['.jpg', '.png', '.jepg'];
              let ext = path.extname(req.file.originalname);

              return acceptedExt.includes(ext);

            }
            return true;
            
          })
          .withMessage("Extensión inválida"), 
    
           
        body("password")
          .notEmpty()
          .withMessage("*Este Campo es obligatorio")
          .bail()
          .isLength({ min: 8 })
          .withMessage("La contraseña debe tener como mínimo 8 caracteres"),
        
        body("retype")
          .notEmpty()
          .withMessage("*Este Campo es obligatorio")
          .bail()
          .custom((value, {req}) => {
            return value == req.body.password;

          })
          .withMessage("*Las contraseñas no coinciden")
    ],


    login: [
        body ('email')
          .notEmpty()
          .withMessage("*Este Campo es obligatorio")
          .bail()
          .custom((value, {req}) => {

            // Ver si email existe

            let respuesta = db.Users.findOne({
              where: {email: value}
            })
            // Si existe, validar contrase;a
            .then(function(user){
              if(user){
                let validation = bcryptjs.compareSync(req.body.password, user.dataValues.password);
                return validation;
              }
            })
            // Validacion ok o no => Mensaje 
            .then(function(result){
              if(result){
                return true;           
                
              }else{
                return Promise.reject('Email o contrase;a invalidos');

              }
            });
            return respuesta;
          }),

        body("password")
          .notEmpty()
          .withMessage("El campo es obligatorio")
      ],

      profile: [
        body("username")
          .notEmpty()
          .withMessage("*Este Campo es obligatorio")
          .bail()
          .isLength({ min: 3 })
          .withMessage("*El usuario debe tener como mínimo 3 caracteres")
          .bail()
          .custom((value) => {

            let respuesta = db.Users.findOne({
              where: {username: value}
            })
            .then(function(result){
              if(result){
                return Promise.reject('Usuario ya registrado');
              }
            });
            return respuesta;
          }),                

        body("email")
          .notEmpty()
          .withMessage("*Este campo es obligatorio")
          .bail()
          .isEmail()
          .withMessage("*El campo debe ser un email")
          .bail()
          .custom((value) => {

            let respuesta = db.Users.findOne({
              where: {email: value}
            })
            .then(function(result){
              if(result){
                return Promise.reject('Email ya registrado');
              }
            });
            return respuesta;
          })
      ]

}

module.exports = validator;