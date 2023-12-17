const User = require("../models/user.model.js");
const Kauf = require("../models/kauf.model.js");

const connection = require("../db.js");
const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
    if(!req.body.vorname || !req.body.nachname || 
       !req.body.isFAHO || !req.body.splitwise || 
       !req.body.email) {

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

    connection().then(async (db) => {
        const collection = db.collection("user");
        try {
            result = await collection.insertOne({
                name: user.vorname, 
                lastname: user.nachname,
                isFaho: user.isFaho,
                zimmerNr: user.zimmerNr,
                splitwise: user.splitwise,
                email: user.email
            });
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

    connection().then(async (db) => {
        const collection = db.collection("user");
        try {
            result = await collection.find({
                _id: new ObjectId(id)
            });
            if(result.length != 1) {
                res.json(401, `Cannot find Getraenk with id=${id}.`)
                return
            }
            res.json(result);
        }
        catch(e) {
            console.log(e);
            res.json(500);
        }
    })
};

exports.findAll = (req, res) => {
    connection().then(async(db) => {
        const collection = db.collection("user");
        try {
            results = await collection.find({}).toArray();
            res.json(results);
        }
        catch(e){
            console.log(e);
            res.json(500);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    connection().then(async (db) => {
        const collection = db.collection("user");
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