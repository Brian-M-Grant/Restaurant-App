var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Poprost@22",
    database: "rest_app"
});

conn.connect((err) => {
    if (!err)
        console.log('Connected to database Successfully');
    else
        console.log('Connection To Database Failed!' + JSON.stringify(err, undefined, 2));
});

module.exports = conn;