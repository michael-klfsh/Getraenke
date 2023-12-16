const Getraenk = require("../models/getraenke.model.js");
const connection = require("../db.js");
const ObjectId = require("mongodb").ObjectId;


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
    console.log(id);

    connection().then(async (db) => {
        const collection = db.collection("drink");
        let result = await collection.find({_id: new ObjectId(id)}).toArray();
        console.log(result);
        if(result.length != 1) {
            res.json(401, `Cannot find Getraenk with id=${id}.`)
            return
        }
        res.json(result);
    });
};

exports.findAll = async (req, res) => { 
    connection().then(async (db) => {
        const collection = db.collection("drink");
        let results = await collection
          .find({})
          .limit(50)
          .toArray();
        if (results.length == 0) {
          res.json(401, "No drinks found!");
          return;
        }
        res.json(results);
        return;
      });    
}

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