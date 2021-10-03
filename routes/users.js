const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('../controllers/userController');

const { body } = require('express-validator');

const validations = [
    body('name').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    body('email').isEmail().withMessage('Debe ingresar un email valido'),
    body('password').isLength({min:8}).withMessage('Debe ingresar una contraseña valida (min 8 caracteres)'),
    body('country').notEmpty().withMessage('Debe seleccionar un pais')
]

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let folder = path.join(__dirname, '../public/img/');
        cb(null, folder);
    },
    filename: (req, file, cb)=>{
        console.log(file);
        let imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

let upload = multer({ storage: storage });

router.get('/register', userController.register);
router.post('/register', upload.single('profileImage'), validations, userController.store);
router.get('/login', userController.login); 
//router.post('/login', userController.loginpost); 

module.exports = router;
