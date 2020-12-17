const mysql = require('mysql');

var pool = mysql.createPool({
    "user": "root",
    "password": "usbw",
    "database": "login",
    "host": "localhost",
    "port": 3307
});
exports.pool = pool;