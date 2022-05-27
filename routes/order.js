var express = require('express');
var router = express.Router();
var conn = require('../lib/db')

router.get('/order', function(req, res, next) {
    let las = "SELECT * FROM menu";
    conn.query(las, function(err, rows) {
        if (!err) {
            res.render('order')
        } else {
            console.log(err)
        }
    })

})
module.exports = router;