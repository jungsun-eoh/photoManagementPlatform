/////entire application and all dependecties here. 

// express app
var express = require('express');   

// modules
var path = require('path');         
var cookieParser = require('cookie-parser');    
var logger = require('morgan');     

// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/dbtest');

// make express app
var app = express();

// middleware function 
// order is important

///// run on every request, and print the request that URL value to the console. 
app.use((req, resp, next) => {
    console.info('\x1b[42m\x1b[30m Requst URL: ' + req.url + '\x1b[0m');
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
///// once express fx receives a request executing these routers above
/////   depending  on the path as typed on localhost:3000, will be mapped to the route path below.

///// __dirname : path to the application
// __dirname + public/ + this.request.url
// /var/www/html/app/public/stylesheets/style.css

app.use('/', indexRouter);      ///// -> go index.js to run router.
app.use('/users', usersRouter); ///// -> go users.js to run router.
app.use('/dbtest', dbRouter); ///// -> go users.js to run router.

app.use((err, req, res, next) => {
    res.status(500);
    res.send('********db error*********');
});


// ** put error handler

module.exports = app;
