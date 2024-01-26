const Getraenk = require("../models/getraenke.model.js");
const connection = require("../db.js");
const ObjectId = require("mongodb").ObjectId;


exports.create = (req, res) => {
    console.log(req.body)
    if(!req.body.name || !req.body.preis) {
        res.json(400, "Need to pass a name and a price!");
        return;
    }
    const getraenk = {
        name: req.body.name,
        preis: req.body.preis
    };
    connection().then(async (db) => {
        const collection = db.collection("drink");
        try {
            result = await collection.insertOne({name: getraenk.name, price: getraenk.price});
            res.json(result);
        }
        catch(e) {
            console.log(e);
            res.json(500);
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

    connection().then(async (db) => {
        const collection = db.collection("drink");
        try {
            let result = await collection.deleteOne({_id: new ObjectId(id)});
            res.json(result);
        }
        catch(e) {
            console.log(e);
            res.json(500);
        }
    });
};