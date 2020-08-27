const express = require("express");
const router = express.Router();

const apiInfoController = require('../../controllers/api/apiInfoController');

router.get('/', apiInfoController.list);

module.exports = router;