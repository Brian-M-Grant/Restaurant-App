var express = require('express');

var router = express.Router();
var conn = require('../lib/db')
    /* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedin === true) {
        res.render('index', {
            user: "SELECT username FROM auth"
        });
    } else {
        res.redirect('/login/login')
    }
});
module.exports = router;