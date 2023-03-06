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
  sql.then(connection => {
    connection.query("INSERT INTO Nutzer SET ?", newUser)
    .then(rows => {
      console.log("created User: ", { id: rows.insertId, ...newUser });
      result(null, { id: rows.insertId, ...newUser });
    })
    .catch(err => {
      console.log("error: ", err);
      result(err, null);
      return;
    })
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
    });
  });
};
  
User.getAll = (result) => {
  sql.then(connection => {
    connection.query("SELECT * FROM Nutzer")
    .then(rows => {
      result(null, rows);
    })
    .catch(err => {
      result(null, err);
    });
  });
};
  
User.remove = (id, result) => {
  sql.then(connection => {
    connection.query(`DELETE FROM Nutzer WHERE id = ${id}`)
    .then(rows => {
      if (rows.length === 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted user with id: ", id);
      result(null, rows);
    })
    .catch(err => {
      console.log("error: ", err);
      result(null, err);
    });
  });
};
  
User.removeAll = result => {
  sql.then(connection => {
    connection.query("DELETE FROM Nutzer")
    .then(rows => {
      console.log(`deleted ${rows.length} users`);
      result(null, rows);
    })
    .catch(err => {
      console.log("error: ", err);
      result(null, err);
    });
  });
};
  
module.exports = User;