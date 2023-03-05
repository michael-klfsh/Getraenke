const db = require("../models");
const User = db.user;
const Kauf = db.kauf;
const Op = db.Sequelize.Op;

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

    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
    .then(data => {
        if(data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot find User with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving User with id=${id}.`
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "User was deleted successfully!"
            });
        }
        else {
            res.send({
                message: `Cannot delete User with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Could not delete User with id=${id}`
        });
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