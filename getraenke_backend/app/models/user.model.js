const connection = require("./db.js");
const sql = require("./db.js");


// constructor
const User = function(user) {
    this.vorname = user.title;
    this.nachname = user.nachname;
    this.isFaho = user.isFaho;
    this.zimmerNr = user.zimmerNr;
    this.splitwise = user.splitwise;
    this.email = user.email;
  };
  
  User.create = (newUser, result) => {
    sql.query("INSERT INTO Nutzer SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created User: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };
  
  User.findById = (id, result) => {
    sql.then(connection => {
      connection.query(`SELECT * FROM Nutzer WHERE id = ${id}`)
      .then(rows => {
        if (rows.length) {
          console.log("found user: ", rows[0]);
          result(null, rows[0]);
          return;
        }
        console.log("not found");
        result({ kind: "not_found" }, null);
      })
      .catch(err => {
        console.log("error: ", err);
        result(err, null);
        return;
      });
    });
  };
  
  User.getAll = (result) => {
    let query = "SELECT * FROM Nutzer";
  
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      result(null, res);
    });
  };
  
  User.remove = (id, result) => {
    sql.query("DELETE FROM Nutzer WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
  
  User.removeAll = result => {
    sql.query("DELETE FROM Nutzer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
  
  module.exports = User;