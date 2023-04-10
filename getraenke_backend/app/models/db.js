const mariadb = require("mariadb");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mariadb.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  //socketPath: "/var/run/mysqld/mysqld.sock"
})
.then(conn => {
    console.log("connected ! connection id is " + conn.threadId);
    return conn;
  })
  .catch(err => {
    console.log("not connected due to error: " + err);
});

//Hier wird ein Promise exportet! Um damit was anfangen zu können, muss .then genutzt werden
module.exports = connection;