const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { body } = require("express-validator");
const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");

router.get("/register", usersController.register);
router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("*Este Campo es obligatorio")
      .isEmail()
      .withMessage("El campo debe ser un email")
      .custom((value) => {
        let user = usersModel.findBySomething((user) => user.email == value);

        return !user;
      })
      .withMessage("Email ya registrado"),
    body("user")
      .notEmpty()
      .withMessage("*Este Campo es obligatorio")
      .isLength({ min: 3 })
      .withMessage("El usuario debe tener minimo 3 caracteres")
      .custom((value) => {
        let user = usersModel.findBySomething((user) => user.user == value);

        return !user;
      })
      .withMessage("Usuario ya registrado"),
    body("password")
      .notEmpty()
      .withMessage("*Este Campo es obligatorio")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener minimo 8 caracteres"),
  ],
  usersController.save
);

router.get("/login", usersController.login);

router.get("/cart", usersController.cart);

module.exports = router;
