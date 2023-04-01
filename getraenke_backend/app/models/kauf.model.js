const sql = require("./db.js");

const Kauf = function(kauf) {
    this.getraenkeId = kauf.getraenkeId;
    this.userId = kauf.userId;
    this.anzahl = kauf.anzahl;
};

Kauf.create = (newKauf, result) => {
    sql.then(connection => {
        connection.query(`INSERT INTO UserKauftGetraenk (getraenkeId, userId, anzahl) VALUES ("${newKauf.getraenkeId}","${newKauf.userId}","${newKauf.anzahl}")`)
        .then(rows => {
            result(null, toObject(rows));
        })
        .catch(err => {
            result(err, null);
            return;
        })
    });
};

Kauf.getUserDrinkAfterTimestamp = (userId, getraenkId, timestamp, result) => {
    sql.then(connection => {
        connection.query(`SELECT * FROM UserKauftGetraenk WHERE userId = ${userId} AND getraenkeId = ${getraenkeId} AND timestamp >= ${timestamp}`)
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
        connection.query(`SELECT * FROM UserKauftGetraenk WHERE userId = ${userId}`)
        .then(rows => {
            result(null, toObject(rows));
        })
        .catch(err => {
            result(err, null);
            return;
        })
    });
};

Kauf.getFromUserAfterTimestamp = (userId, timestamp, result) => {
    sql.then(connection => {
        connection.query(`SELECT * FROM UserKauftGetraenk WHERE userId = ${userId} AND timestamp >= ${timestamp}`)
        .then(rows => {
            result(null, toObject(rows));
        })
        .catch(err => {
            result(err, null);
            return;
        })
    });
};

Kauf.getAllAfterTimestamp = (timestamp, result) => {
    sql.then(connection => {
        connection.query(`SELECT * FROM UserKauftGetraenk WHERE timestamp >= ${timestamp}`)
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

module.export = Kauf;