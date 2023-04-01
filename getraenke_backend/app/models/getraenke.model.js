const sql = require("./db.js");

const Getraenk = function(getraenk) {
    this.name = getraenk.name;
    this.preis = getraenk.preis;
};

Getraenk.create = (newGetraenk, result) => {
  sql.then(connection => {
    connection.query(`INSERT INTO Getraenke (name, preis) VALUES ("${newGetraenk.name}","${newGetraenk.preis}")`)
    .then(rows => {
      result(null, rows.toObject);
    })
    .catch(err => {
      console.log("error: ", err);
      result(err, null);
      return;
    })
  });
};

Getraenk.findById = (id, result) => {
  sql.then(connection => {
    connection.query(`SELECT * FROM Getraenke WHERE id = ${id}`)
    .then(rows => {
      if(rows.length) {
        result(null, rows[0].toObject);
        return;
      }
      result({ kind: "not_found" }, null);
    })
    .catch(err => {
      result(err, null);
    });
  });
};

Getraenk.getAll = (result) => {  
  sql.then(connection => {
    connection.query("SELECT * FROM Getraenke")
    .then(rows => {
      result(null, rows.toObject);
    })
    .catch(err => {
      result(null, err);
    });
  });
};

Getraenk.remove = (id, result) => {
  sql.then(connection => {
    connection.query(`DELETE FROM Getraenke WHERE id = ${id}`)
    .then(rows => {
      if(rows.length === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, rows.toObject);
    })
    .catch(err => {
      result(null, err);
    });
  });
};
  
  Getraenk.removeAll = result => {
  sql.then(connection => {
    connection.query("DELETE FROM Getraenke")
    .then(rows => {
      result(null, rows.toObject);
    })
    .catch(err => {
      result(null, err);
    });
  });
};

Getraenk.toObject = result => {
  return JSON.parse(JSON.stringify(this, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
};
  
module.exports = Getraenk;