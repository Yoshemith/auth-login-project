const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 

router.get('/color', mainController.color);
router.get('/borrar', mainController.borrar)

module.exports = router;
