require('dotenv').config();
const mysql = require('mysql');
/// User/Password :
const mysqlUser = process.env.USER;
const mysqlPassword = process.env.PASSWORD;
const mysqlDatabase = process.env.DATABASE;

///Create Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase,
});

/// Connect
db.connect((err) => {
  if (err) {
    console.log('Not connected');
    throw err;
  } else {
    console.log('MYsql connected....');
  }
});

module.exports = db;
