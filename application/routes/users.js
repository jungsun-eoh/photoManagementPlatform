var express = require('express');
var router = express.Router();

const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const UserError = require('../helpers/errors/UserError');

const db = require('../config/database');

router.post('/register', (req, resp, next) => {

  let username = req.body.username;
  let email = req.body.email;
  let password=req.body.password;

  // validate the information. 
  /**
   * valicate form data
   * check username (unique username)
   * check email
   * check password
   * 
   */
    db.execute('SELECT * FROM users WHERE username=?', [username])
    // breaking promise chain
      .then(([results, fields]) => {
        if(results && results.length == 0) {
          return db.execute('SELECT * FROM users WHERE email=?', [email]);
        } else {
          throw new UserError(
            'username already exists', '/register', 200);
        }
      })
      .then (([results, fields]) => {
        if(results && results.length == 0) {
          let baseSQL = 
            'INSERT INTO users (username, email, password, created) VALUES (?,?,?, now());';
          return db.execute(baseSQL, [username, email, password]);
        } else {
          throw new UserError('email already exists', '/register', 200);
        }
      })
      .then (([results, fields]) => {
        if(results && results.affectedRows) {
          successPrint('user has been created');
          resp.redirect('/login');
        } else {
          throw new UserError('Server Error, fail to create new user', '/register', 500);
          
        }
      })
      .catch((err) => {
        if(err instanceof UserError) {
          errorPrint(err.getMessage());
          resp.status(err.getStatus());
          resp.redirect(err.getRedirectURL);
        } 
          next(err);
        
      });
   //make sure username donsnt exist
   // make usre email doesnt exit
   // create new user
      // if ok, rediriect to login
      // if failed redirect to register
    //  catch any errs
      // if usererror
      // set status and message and rediriect

});

router.post('/login', (req, resp, next) => {
  let username = req.body.username;
  let password = req.body.password;

  db.execute('SELECT * FROM users WHERE username=? AND password=?', [username, password])
    .then(([results, fields])=> {
      if (results && results.length == 1) {
        successPrint('successful login');
        resp.redirect('/');
      } else {
        throw new UserError('username or password is incorrect', '/login', 200);
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

});
/* GET users listing. */

// //localhost:3000/users
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// //localhost:3000/users/register         /////mounted path

// router.post('/register', function(req, res, next) {
//   res.send('respond with a resource');
// });


module.exports = router;
