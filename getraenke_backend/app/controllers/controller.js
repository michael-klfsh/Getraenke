const db = require("../models");
const User = db.user;
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

/*exports.findAll = (req, res) => {

};*/

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

/*exports.update = (req, res) => {

};*/

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
            message: `ould not delete User with id=${id}`
        });
    });
};

/*exports.deleteAll = (req, res) => {

};*/