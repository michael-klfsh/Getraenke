const db = require("../models");
const Getraenk = db.getraenk;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.name || !req.body.preis) {
        res.status(400).send({
            message: "Need to pass a name and a price!"
        });
        return;
    }
    const getraenk = {
        name: req.body.name,
        preis: req.body.preis
    };

    Getraenk.create(getraenk)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the drink."
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
                message: `Cannot find drink with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving drink with id=${id}.`
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
                message: "Drink was deleted successfully!"
            });
        }
        else {
            res.send({
                message: `Cannot delete drink with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `ould not delete drink with id=${id}`
        });
    });
};