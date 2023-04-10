const sql = require("./db.js");

const Kauf = function(kauf) {
    this.getraenkId = kauf.getraenkId;
    this.nutzerId = kauf.nutzerId;
    this.anzahl = kauf.anzahl;
};

Kauf.create = (newKauf, result) => {
    sql.then(connection => {
        connection.query(`INSERT INTO NutzerKauftGetraenk (getraenkId, nutzerId, anzahl) VALUES ("${newKauf.getraenkId}","${newKauf.nutzerId}","${newKauf.anzahl}")`)
        .then(rows => {
            result(null, toObject(rows));
        })
        .catch(err => {
            result(err, null);
            return;
        })
    });
};

Kauf.getUserDrinkAfterTimestamp = (userId, getraenkId, date, result) => {
    sql.then(connection => {
        connection.query(`SELECT * FROM NutzerKauftGetraenk WHERE nutzerId = ${userId} AND getraenkId = ${getraenkId} AND DATE(zeit) >= '${date}'`)
        .then(rows => {
            if(rows.length) {
                result(null, toObject(rows[0]));
            }
            result({kind: "not_found"}, null);
        })
        .catch(err => {
            result(err, null);
            return;
        })
    });
};

Kauf.getAllByUser = (userId, result) => {
    sql.then(connection => {
        connection.query(`SELECT * FROM NutzerKauftGetraenk WHERE nutzerId = ${userId}`)
        .then(rows => {
            result(null, toObject(rows));
        })
        .catch(err => {
            result(err, null);
            return;
        })
    });
};

Kauf.getFromUserAfterTimestamp = (userId, date, result) => {
    sql.then(connection => {
        connection.query(`SELECT * FROM NutzerKauftGetraenk WHERE nutzerId = ${userId} AND DATE(zeit) >= '${date}'`)
        .then(rows => {
            result(null, toObject(rows));
        })
        .catch(err => {
            result(err, null);
            return;
        })
    });
};

Kauf.getAllAfterTimestamp = (date, result) => {
    sql.then(connection => {
        connection.query(`SELECT * FROM NutzerKauftGetraenk WHERE DATE(zeit) >= '${date}'`)
        .then(rows => {
            result(null, toObject(rows));
        })
        .catch(err => {
            result(err, null);
            return;
        })
    });
};

toObject = (elem) => {
    return JSON.parse(JSON.stringify(elem, (_key, value) => 
        typeof value === 'bigint' ? value.toString() : value
    ));
};

module.exports = Kauf;