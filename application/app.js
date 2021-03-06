/////entire application and all dependecties here. 

// express app
var express = require("express");   

// modules
var path = require("path");         
var cookieParser = require("cookie-parser");    
var logger = require("morgan");     
var bodyParser = require("body-parser");
var session = require("express-session");
var mysqlStore = require("express-mysql-session")(session);

// routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postRouter = require("./routes/posts");
var dbRouter = require("./routes/dbtest");

// make express app
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));

var sessionStore = new mysqlStore({/* using default option*/}, require('./config/database'));
var sessionOptions= {
    key: "csid",
    secret: "this is a secret for csc317",
    store: sessionStore,
    cookie: {secure: false, httpOnly: false, maxAge: 900000},
    resave: false, 
    saveUninitialized: false
}

app.use(session(sessionOptions));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", indexRouter);      ///// -> go index.js to run router.
app.use("/users", usersRouter); ///// -> go users.js to run router.
app.use("/posts", postRouter);
app.use("/dbtest", dbRouter); ///// -> go users.js to run router.


app.use((err, req, res, next) => {
    console.log(err);
    res.sendFile("error.html", { root: "public/html"});
});


// ** put error handler

module.exports = app;
