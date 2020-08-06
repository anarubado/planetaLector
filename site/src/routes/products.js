const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');

// Multer

var storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', '..', 'public', 'images', 'products'))
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

router.get('/', productsController.index);
router.get('/detail/:idProduct', productsController.detail);

/*Rutas para editar un producto*/
router.get('/edit/:idProduct', productsController.edit);
router.post('/edit/:idProduct',upload.single('image'),productsController.update);

module.exports = router;
