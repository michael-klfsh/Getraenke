const User = require("../models/user.model.js");

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
        isFAHO: req.body.isFAHO,
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

    User.remove(id, (err, date) => {
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
        getraenkeId: req.body.getraenkeId,
        userId: req.params.id,
        anzahl: req.body.anzahl
    };

    Kauf.create(kauf)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Kauf."
        });
    });
};

exports.findBuy = (req, res) => {
    const id = req.params.id;
    const getraenkeId = req.params.getraenkeId ? req.params.getraenkeId : -1;

    if(!req.body.startTime) {
        res.status(400).send({
            message: "Provide a starting time!"
        });
        return;
    }

    if(!req.body.endTime) {

    }
    else {

    }
};