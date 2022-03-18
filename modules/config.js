const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mycardb',
    multipleStatements: true
});
// open the MySQL connection
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

module.exports = db