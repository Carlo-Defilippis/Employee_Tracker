const util = require("util");
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "6822",
    database: "employee_trackerdb"
});


module.exports = connection;