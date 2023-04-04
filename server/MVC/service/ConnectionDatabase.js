const mysql = require('mysql');


// sql conncetion
const database = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"reminderSystem",
});
module.exports = {database};