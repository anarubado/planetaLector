const express = require("express");
const router = express.Router();

const apiProductsController = require('../../controllers/api/apiProductsController');

router.get('/', apiProductsController.list);
//router.post('/', apiProductsController.store); ????

router.get('/:id', apiProductsController.find);


module.exports = router;