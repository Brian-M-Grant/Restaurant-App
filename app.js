const port = process.env.PORT || 7000;
var express = require('express');
var path = require('path');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var conn = require('./lib/db');
var session = require('express-session')
var app = express();

var conn = require('./lib/db');
var homeRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var loginRouter = require('./routes/login');
var orderRouter = require('./routes/order')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: '432166',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200 }
}));
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: {}
    // });
    logger.log("error", err);
    res.json({
        error: err.message,
    });
});

app.use(flash());
app.use('/menu', menuRouter);
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/order', orderRouter);
app.listen(port, () => console.log(`listening on port ${port}..`));

module.exports = app;