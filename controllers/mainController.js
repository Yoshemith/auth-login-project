const { validationResult } = require('express-validator');

const controller = {
	index: (req, res) => {
		if(req.session.name){
            let data = req.session;
            return res.render('index', {data})
        }
        res.render('index');

	},
    store: (req, res) => {
		let resultValidation = validationResult(req);
        console.log(resultValidation);

        if(resultValidation.errors.length > 0){
            return res.render('index', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }else{
            req.session.name = req.body.name;
            req.session.color = req.body.color;
            req.session.email = req.body.email;
            req.session.age = req.body.age;
            if(req.body.recordar_color){
                res.cookie('color', req.body.color, {maxAge: 480 * 1000})
            }
            res.redirect('/');
            /* return res.render('index', {
                data: req.body
            }); */
        }
	},
    color: function(req, res){
        if(req.session.name){
            let data = req.session
            return res.render('color', {data})
        }
        res.render('color')
    },
    borrar: function(req, res){
        req.session.color = null;
		res.cookie('color', null, { maxAge: -1 });
		res.send('El color se ha borrado');
    }
};

module.exports = controller;