const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');

const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');

// Multer

var storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', '..', 'public', 'images', 'products'));
    },
  
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage,
    fileFilter: function(req, file, cb){
      let acceptedExt = ['.jpg', '.png', '.jepg'];
      let ext = path.extname(file.originalname);
  
      if(!acceptedExt.includes(ext)){
        req.file = file;
      }
  
      cb(null, acceptedExt.includes(ext));
    }
  })

//router.get('/categories', productsController.categories);

router.get('/category/:id', productsController.category);

router.get('/detail/:idProduct', productsController.detail);

/*Rutas para editar un producto*/
router.get('/edit/:idProduct', auth.guest, productsController.edit);
router.post('/edit/:idProduct', upload.single('image'), validator.editProduct, productsController.update);

/*Ruta para crear un producto*/
router.get('/create', auth.guest, productsController.create);
router.post('/create', upload.single('image'), validator.createProduct, productsController.save);

/*Ruta para borrar un producto*/
router.post('/delete/:idProduct', auth.guest, productsController.delete);

/* Ruta para mostrar productos para el admin */
router.get('/list', productsController.list);


module.exports = router;
