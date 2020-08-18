const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");


const jsonModel = require("../models/jsonModel");
const usersModel = jsonModel("users.json");
const path = require('path');
const multer = require('multer');
const validator = require("../middlewares/validator");
const auth = require('../middlewares/auth');
const { user } = require("../middlewares/auth");

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

router.get("/register", auth.user, usersController.register);
router.post("/register", upload.single('image'), validator.register, usersController.processRegister);

router.get("/login", auth.user, usersController.login);
router.post ('/login', validator.login, usersController.processLogin);
router.post('/logout', usersController.logout);

router.get("/cart", auth.guest, usersController.cart);

router.post('/cart/delete/:id', usersController.deleteFromCart);

router.post('/cart/:id', auth.guest, usersController.addToCart);

router.get('/profile/password/:id', auth.guest, usersController.password);
router.post('/profile/editpassword/:id', validator.password, usersController.editPassword);

router.get('/profile/:id', auth.guest, usersController.profile);
router.post('/profile/:id', validator.profile, usersController.editProfile);

router.post('/checkout/:id', usersController.checkout);

router.get('/create', usersController.create);
router.post('/create', validator.register, usersController.save);

router.get('/list', usersController.list);

router.post('/delete/:id', usersController.delete);

router.get('/edit/:id', usersController.edit);



module.exports = router;
