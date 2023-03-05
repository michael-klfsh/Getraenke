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
    sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
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
    sql.query(`SELECT * FROM User WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  User.getAll = (result) => {
    let query = "SELECT * FROM User";
  
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      result(null, res);
    });
  };
  
  User.remove = (id, result) => {
    sql.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
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
    sql.query("DELETE FROM User", (err, res) => {
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