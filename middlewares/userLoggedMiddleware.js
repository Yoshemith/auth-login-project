const User = require('../models/usersModel');

function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail; //checamos las cookies
    //lo buscamos en la BD
    let userFromCookie = User.findByField('email', emailInCookie);
    //console.log(userFromCookie);

    //Si esta en la BD entonces se loguea on session
    if (userFromCookie){
        req.session.userLogged = userFromCookie;
    }
    //si esta logueado en session entonces se manda a locals
    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;