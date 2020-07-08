const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");


const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");
const path = require('path');
const multer = require('multer');
const validator = require("../middlewares/validator");
const e = require("express");

// Multer

var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'public', 'images', 'users'))
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage,
  imageFilter: function(req, file, cb){

    let acceptedExt = ['.jpg', '.png', '.jepg'];
    let ext = path.extname(file.originalname);

    if(!acceptedExt.includes(ext)){
      req.file = file;
    }

    cb(null, acceptedExt.includes(ext));
  }
})

// Rutas

router.get("/register", usersController.register);
router.post("/register", upload.single('image'), validator.register, usersController.processRegister);

router.get("/login", usersController.login);
router.post ('/login', validator.login, usersController.processLogin )

router.get("/cart", usersController.cart);

module.exports = router;
