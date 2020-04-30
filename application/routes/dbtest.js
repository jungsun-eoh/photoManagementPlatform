
const express = require('express');
const router = express.Router();
const db = require('../conf/database');


router.get('/getAllUsers', (req, res, next) => {
    // when this db.query is executed, it triggers a callback. 
    db.query('SELECT * from users;', (err, results, fields) => {
        if(err){
            // because this is asynchrous fx,  throw err;   will not work. 
            // we must pass error signal using next(err); 
            next(err); 
        }
        console.log(results);
        res.send(results);
    }); // this .query is asynchroous. 
});

router.get('/getAllPosts', (req, res, next) => {
    // when this db.query is executed, it triggers a callback. 
    db.query('SELECT * from posts;', (err, results, fields) => {
        if(err){
            next(err); 
        }
        console.log(results);
        res.send(results);
    }); // this .query is asynchroous. 
});

router.get('/getAllPostsP', (req, res, next) => {
    db.query('SELECT * from posts;')
    // if you get resolve case: the promise was fulfilled. it returns promise. 
    //      reject case: fail to fulfill
        .then(([results, fields]) => {
            console.log(results);
            res.send(results);
        })
        .catch((err) => {
            // no need extra catch/then block, if there is error this catch box will catch
            next(err);
        });
    //      it returns data as array of data. 
    // destructuring: it gives names to array values
    //  const [x, y] = [1, 2]   // x =1, y =2
});

router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    /* validate data, if bad send back response */
    // res.redirect('/registration');

    let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?,?,?,now())';

    db.query(baseSQL, [username, email, password])
        .then(([results, fields]) => {
            if(results && results.affectedRows) {
                res.send('user was made');
            } else {
                res.send('user was not made');
            }
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;
// or you can use         import {Router} from express;
