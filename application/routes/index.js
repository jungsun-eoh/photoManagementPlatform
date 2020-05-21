var express = require("express");
var router = express.Router();
var path = require("path");
var isLoggedIn = require("../middleware/routerprotectors").userIsLoggedIn;

const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;

/* GET home page. */

//localhost:3000
router.get("/", function(req, res, next) {
  // middleware function         //* MIDDLEWARE FX END WITH "next" *//
  // get request from "/" url path, and sendFile
  res.sendFile("index.html", {root:"public/html"});   // return simple html pages
  //res.render("index") -> only work for index file. 
});

//localhost:3000/login          /////mounted path ////// the fx only execute on this path
router.get("/login", function (req, res, next) {
  res.sendFile("login.html", {root:"public/html"});
});

//localhost:3000/registration          
router.get("/register", function (req, res, next) {
  res.sendFile("registration.html", {root:"public/html"});
});

router.use("/postimage", isLoggedIn);
//localhost:3000/postimage          
router.get("/postimage", function (req, res, next) {
  res.sendFile("postimage.html", {root:"public/html"});
});




module.exports = router;
