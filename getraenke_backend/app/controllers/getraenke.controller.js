const Getraenk = require("../models/getraenke.model.js");

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

    Getraenk.create(getraenk, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the drink."
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Getraenk.findById(id, (err, data) => {
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cannot find Getraenk with id=${id}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Getraenk with id=${id}.`
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

    Getraenk.remove(id, (err, date) => {
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