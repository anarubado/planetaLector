const express = require("express");
const router = express.Router();
const registroController = require('../controllers/registroController');

router.get('/', registroController.index);
//router.post('/', registroController.save);

module.exports = router;