///// create the pool for my connection
const mysql = require('mysql2');    // load mysql package into node application


const pool = mysql.createPool ({
    host:"localhost",
    user:"root",
    password:"csc3176213",
    database:"csc317db",
    connectionLimit: 50,
    debug: false,
});

const promisePool = pool.promise();
module.exports = promisePool;
