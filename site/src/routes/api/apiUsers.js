const express = require("express");
const router = express.Router();

const apiUsersController = require('../../controllers/api/apiUsersController');

router.get('/', apiUsersController.list);
//router.post('/', apiUsersController.store); ????

router.get('/:id', apiUsersController.find);

module.exports = router;