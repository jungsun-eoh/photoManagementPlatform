const routeProtectors = {};
const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;

routeProtectors.userIsLoggedIn = function(req, resp, next) {
    if(req.session.username) {
        successPrint('user is logged in');
        next();
    }else{
        errorPrint('user is not logged in');
        resp.redirect('/login');
    }
}

module.exports = routeProtectors;