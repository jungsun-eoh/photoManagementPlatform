const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;
const UserError = require("../helpers/errors/UserError");
const UserModel = require('../model/users');
const bcrypt = require("bcrypt");

const UserController = {
    createUser: function(req, resp, next) {
        let username = req.body.username;
        let email = req.body.email;
        let password=req.body.password;

   UserModel.usernameExistst(username) 
   .then((usernameDoesNotExist) => {
     if(usernameDoesNotExist) {
      return UserModel.emailExists(email);
     }else {
      throw new UserError(
        "username already exists", "/register", 200);
     }
   })
   .then ((emailDoesNotExist) => {
     if(emailDoesNotExist) {
      return bcrypt.hash(password, 10);
     } else {
      throw new UserError("email already exists", "/register", 200);
     }
   })
   .then ((hashedPassword) => {
     return UserModel.create(username, hashedPassword, email);
   })
   .then ((userWasCreated) => {
     if(userWasCreated) {
      successPrint("user has been created");
      resp.redirect("/login");
     }else {
      throw new UserError("Server Error, fail to create new user", "/register", 500);
     }
   })
      .catch((err) => {
        if(err instanceof UserError) {
          errorPrint(err.getMessage());
          resp.status(err.getStatus());
          resp.redirect(err.getRedirectURL);
        } else {
          next(err);
        }
      })

    },
    logIn: function(req, resp, next) {
        let username = req.body.username;
        let password = req.body.password;
        let userID; 
      
        UserModel.authenticate(username, password)
        .then((userData) => {
          if(userData) {
            successPrint("successful login");
            req.session.username = userData.user;
            req.session.userID = userData.uid;
            resp.redirect("/");
          }else {
            throw new UserError("username or password is incorrect", "/login", 200);
          }
        })
          .catch((err) => {
            if(err instanceof UserError) {
              errorPrint(err.getMessage());
              resp.status(err.getStatus());
              resp.redirect(err.getRedirectURL());
            } else {
              next(err);
            }
          })
    },
    logOut:function(req, resp, next) {
        req.session.destroy((err) => {
            if(err){
              errorPrint('failed to destroy session');
              next(err);
            }else {
              successPrint('session was destryed');
              resp.clearCookie('csid');
              resp.redirect('/login');
            }
          })
    }
}
module.exports = UserController;