const express = require('express');
var router = express.Router();
var conn = require('../lib/db');
router.get('/menu', function(req, res, next) {
    let varSQL = "SELECT * FROM menu";

    conn.query(varSQL, function(err, rows) {
        if (!err) {
            res.render('menu', {
                page_title: "Menu Options",
                data: rows
            })
        } else {
            console.log(err)
        }
    })

});



module.exports = router;