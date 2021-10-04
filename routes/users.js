const express = require('express');
const router = express.Router();

//controller
const userController = require('../controllers/userController');
//middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


//formulario de registro
router.get('/register', guestMiddleware, userController.register);
//procesar el registro
router.post('/register', uploadFile.single('profileImage'), validations, userController.storeUser);
//formulario de login
router.get('/login', guestMiddleware, userController.login); 
//procesar el login
router.post('/login', userController.loginProcess);
//perfil de usuario 
router.get('/profile', userController.profile); 

module.exports = router;
