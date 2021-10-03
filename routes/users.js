const express = require('express');
const router = express.Router();

//controller
const userController = require('../controllers/userController');
//middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');

//formulario de registro
router.get('/register', userController.register);
//procesar el registro
router.post('/register', uploadFile.single('profileImage'), validations, userController.storeUser);
//formulario de login
router.get('/login', userController.login); 
//procesar el login
router.post('/login', userController.loginProcess);
 
//router.post('/login', userController.loginpost); 

module.exports = router;
