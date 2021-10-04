const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: false }));
app.use(session({
     secret: 'secret coding xd',
     resave: false,
     saveUninitialized: false
    }));
app.use(cookies());
app.use(express.static('public'));
app.use(userLoggedMiddleware); //Middleware de aplicacion

const mainRouter = require('./routes/main');
app.use('/', mainRouter);
const rutasUsers = require('./routes/users');
app.use('/user',rutasUsers);

let port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log('Server running at port 3000');
});