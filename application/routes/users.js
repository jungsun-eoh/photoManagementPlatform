var express = require("express");
var router = express.Router();
const UserController = require('../controller/users');

router.post("/register", (req, resp, next) => {
  UserController.createUser(req, resp, next);
});

router.post("/login", (req, resp, next) => {
  UserController.logIn(req, resp, next);
});

router.post('/logout', (req, resp, next) => {
  UserController.logOut(req, resp, next);
});

module.exports = router;
