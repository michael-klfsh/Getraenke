const sql = require("./db.js");

const Kauf = function(kauf) {
    this.getraenkeId = kauf.getraenkeId;
    this.userId = kauf.userId;
    this.anzahl = kauf.anzahl;
};



Kauf.create = (newKauf, result) => {
    sql.query("INSERT INTO UserKauftGetraenk SET ?", newKauf, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, {timestamp: res.timestamp, ...newKauf});
    });
}

Kauf.getUserDrinkAfterTimestamp = (userId, getraenkId, timestamp, result) => {
    sql.query(`SELECT * FROM UserKauftGetraenk WHERE userId = ${userId} AND getraenkId = ${getraenkId} AND timestamp >= ${timestamp}`, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        if(res.length) {
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

Kauf.getAllByUser = (userId, result) => {
    sql.query(`SELECT * FROM UserKauftGetraenk WHERE userId = ${userId}`, (err, res) => {
        if(err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Kauf.getFromUserAfterTimestamp = (userId, timestamp, result) => {
    sql.query(`SELECT * FROM UserKauftGetraenk WHERE userID = ${userId} AND timestamp >= ${timestamp}`, (err, res) => {
        if(err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Kauf.getAllAfterTimestamp = (timestamp, result) => {
    sql.query(`SELECT * FROM UserKauftGetraenk WHERE timestamp >= ${timestamp}`, (err, res) => {
        if(err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};