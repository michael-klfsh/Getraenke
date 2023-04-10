const User = require("../models/user.model.js");
const Kauf = require("../models/kauf.model.js");

exports.create = (req, res) => {
    if(!req.body.vorname) {     //TODO Check more params
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const user = {
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        isFaho: req.body.isFAHO,
        zimmerNr: req.body.zimmerNr ? req.body.zimmerNr : undefined,
        splitwise: req.body.splitwise,
        email: req.body.email,
    };

    User.create(user, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        }
        else {
            res.send(data);
        }
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id, (err, data) => {
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving User with id=${id}.`
                });
            }
        }
        else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.remove(id, (err, data) => {
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found User with id ${id}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Could not delete User with id=${id}`
                });
            }
        }
        else {
            res.send({
                message: "User was deleted successfully!"
            });
        }
    });
};

exports.addBuy = (req, res) => {
    const id = req.params.id;

    if(!req.body.getraenkeId || !req.body.anzahl) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const kauf = {
        getraenkId: req.body.getraenkeId,
        nutzerId: req.params.id,
        anzahl: req.body.anzahl
    };

    Kauf.create(kauf, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating the buy."
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.findBuy = (req, res) => {
    const id = req.params.id;
    const getraenkeId = req.body.getraenkeId;

    if(!req.body.startTime) {
        res.status(400).send({
            message: "Provide a starting time!"
        });
        return;
    }

    if(!getraenkeId) {
        Kauf.getFromUserAfterTimestamp(id, req.body.startTime, (err, data) => {
            if(err) {
                if(err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Cannot find Kauf with userId=${userid} after ${req.body.startTime}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: `Error retrieving Kauf userId=${userid} after ${req.body.startTime}.`
                    });
                }
            }
            else {
                res.send(data);
            }
        })
    }
    else {
        Kauf.getUserDrinkAfterTimestamp(id, getraenkeId, req.body.startTime, (err, data) => {
            if(err) {
                if(err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Cannot find Kauf with userId=${userid}, getraenkeId=${getraenkeId} after ${req.body.startTime}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: `Error retrieving Kauf userId=${userid}, getraenkeId=${getraenkeId} after ${req.body.startTime}.`
                    });
                }
            }
            else {
                res.send(data);
            }
        });
    }
};

exports.allBuysOfUser = (req, res) => {
    const id = req.params.id;

    Kauf.getAllByUser(id, (err, data) => {
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cannot find Kauf with userId=${userid}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Kauf userId=${userid}.`
                });
            }
        }
        else {
            res.send(data);
        }
    })
};