const { body } = require('express-validator');

const validations = [
    body('name').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    body('email').isEmail().withMessage('Debe ingresar un email valido'),
    body('password').isLength({min:8}).withMessage('Debe ingresar una contraseña valida (min 8 caracteres)'),
    body('country').notEmpty().withMessage('Debe seleccionar un pais')
]

module.exports = validations;