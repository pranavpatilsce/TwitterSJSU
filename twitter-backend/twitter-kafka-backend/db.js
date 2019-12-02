var mysql = require('mysql');
// require('dotenv').config();

const pool = mysql.createPool({
    host: "database-1.cecr4orrxfsb.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "shubhamkumar",
    database: "bankingProjectSchema"
});

module.exports = pool;