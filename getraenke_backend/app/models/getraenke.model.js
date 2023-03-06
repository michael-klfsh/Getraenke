const sql = require("./db.js");

const Getraenk = function(getraenk) {
    this.name = getraenk.name;
    this.preis = getraenk.preis;
};

Getraenk.create = (newGetraenk, result) => {
    sql.query("INSERT INTO Getraenke SET ?", newGetraenk, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newGetraenk });
    });
};

Getraenk.findById = (id, result) => {
    sql.query(`SELECT * FROM Getraenke WHERE id = ${id}`, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
};

Getraenk.getAll = (result) => {
    let query = "SELECT * FROM Getraenke";
  
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      result(null, res);
    });
};

Getraenk.remove = (id, result) => {
    sql.query("DELETE FROM Getraenke WHERE id = ?", id, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    });
};
  
  Getraenk.removeAll = result => {
    sql.query("DELETE FROM Getraenke", (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      result(null, res);
    });
};
  
module.exports = Getraenk;