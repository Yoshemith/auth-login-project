const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

//const usersFilePath = path.join(__dirname, '../data/users.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const User = require('../models/usersModel');

const controller = {
	register: (req, res) => {
        res.render('register');
	},
    storeUser: (req, res) => {
        //console.log(req.body);//console.log(req.file);
        const resultValidation = validationResult(req);
        //console.log(resultValidation);
        if(resultValidation.errors.length > 0){
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }else{

            let userInDB = User.findByField('email', req.body.email)
            //return res.send(userInDB);
            if(userInDB){
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya esta registrado'
                        }
                    },
                    oldData: req.body
                });
            }
            let upImage = req.file ? req.file.filename :  'profile-user.png'; 
            let newUser = {
                //id: users[users.length - 1].id + 1,
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
                image: upImage
            };
            let userCreated = User.create(newUser); //usamos el model
            //users.push(newUser);
            //fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
            res.redirect('/user/login');//res.send('Se guardo el usuario');
        }
    },
    login: (req, res) => {
        //console.log(req.session)
        res.render('login');
	},
    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email)
        if(userToLogin){
            let isValidPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(isValidPassword){
                delete userToLogin.password; //borrar propiedad password del usuario logeado en el session
                req.session.userLogged = userToLogin;
                return res.redirect('/user/profile');
            }
            return res.render('login', {
                errors:{
                    email:{
                        msg: 'Las credenciales son invalidas'
                    }
                }
            });
        }
        return res.render('login', {
            errors:{
                email:{
                    msg: 'No se encuentra este email'
                }
            }
        });
        //res.send(userToLogin);
	},
    profile: (req, res) => {
        //console.log(req.session)
        res.render('profile', {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;