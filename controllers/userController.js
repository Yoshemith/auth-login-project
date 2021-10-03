const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
	register: (req, res) => {
        res.render('register');
	},
    store: (req, res) => {
        console.log(req.body);
        console.log(req.file);
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if(resultValidation.errors.length > 0){
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }else{
            let upImage; 
            if(req.file){
                upImage = req.file.filename;
            }else{
                upImage = 'profile-user.png';
            }
            let newUser = {
                id: users[users.length - 1].id + 1,
                ...req.body,
                image: upImage
            };
            users.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
            res.redirect('/login');
        }
    },
    login: (req, res) => {
        res.render('login');
	}
}

module.exports = controller;