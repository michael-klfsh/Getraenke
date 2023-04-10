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
    connection.query(`INSERT INTO Nutzer (vorname, nachname, isFAHO, zimmerNr, splitwise, email) VALUES ("${newUser.vorname}","${newUser.nachname}",${newUser.isFaho},${newUser.zimmerNr},${newUser.splitwise},"${newUser.email}")`)
    .then(rows => {
      console.log("created User: ", toObject(rows));
      result(null, toObject(rows));
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
        console.log("found user: ", toObject(rows[0]));
        result(null, toObject(rows[0]));
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
      result(null, toObject(rows));
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
      result(null, toObject(rows));
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
      result(null, toObject(rows));
    })
    .catch(err => {
      console.log("error: ", err);
      result(null, err);
    });
  });
};

toObject = (elem) => {
  console.log(elem);
  return JSON.parse(JSON.stringify(elem, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value // return everything else unchanged
  ));
};
  
module.exports = User;