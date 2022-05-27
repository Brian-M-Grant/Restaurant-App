var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/login', function(req, res, next) {

        res.render('login.ejs', {
            title: 'Login',
            username: '',
            password: ''
        })
    })
    /*router.post('/auth', function(req, res, next) {

        var username = req.body.username;
        var password = req.body.password;

        conn.query('SELECT * FROM admin WHERE username = ?', [username], function(req, res, err, rows, fields) {
            bcrypt.compare(password, rows[0].password, (err, same) => {
                console.log(rows[0].password)
                if (err) throw err
                console.log(err + "error");
                console.log(rows.length);

                if (rows.length <= 0) {
                    res.redirect("/login/login");
                } else if (same) {
                    req.session.loggedin = true;
                    console.log(same);
                    req.session.username = rows[0].username;
                    res.redirect('/');
                }


            });
        });
    });*/
router.post('/auth', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    conn.query('SELECT * FROM auth WHERE username = ? AND password = ?', [username, password], function(err, rows, fields) {
            console.log(rows.length);
            if (rows.length <= 0) {
                req.flash('error', 'Incorrect Username or Password!!!')
                res.redirect('/login/login')
            } else {
                req.session.loggedin = true;
                req.session.username = rows[0].username;
                req.session.password = rows[0].password;
                res.redirect('/');
            }
        }



    )
})
router.get('/logout', function(req, res) {
    req.session.destroy();
    req.flash('success', 'Enter Your Login Credentials');
    res.redirect('/login/login');
});

module.exports = router;