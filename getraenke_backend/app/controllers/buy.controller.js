const connection = require("../db.js");
const { ObjectId, Timestamp } = require("mongodb");


exports.addBuy = (req, res) => {
    console.log("check")
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

    connection().then(async (db) => {
        const collection = db.collection("buy");
        try {
            result = await collection.insertOne({
                drinkId: new ObjectId(kauf.getraenkId), 
                userId: new ObjectId(kauf.nutzerId),
                amount: kauf.anzahl,
                timestamp: +Date.now()
            });
            res.json(result);
        }
        catch(e) {
            console.log(e);
            res.json(500);
        }
    })
};

exports.findBuy = (req, res) => {
    if(!req.params.start) {
        res.status(400).send({
            message: "Provide a starting time!"
        });
        return;
    }
    const nutzerId = req.params.id;
    const getraenkeId = req.params.getraenkid;
    const timestamp = req.params.start;

    connection().then(async (db) => {
        const collection = db.collection("buy");
        try {
            if(getraenkeId) {
                results = await collection.find({userId: new ObjectId(nutzerId), drinkId: new ObjectId(getraenkeId), timestamp: {$gte : +timestamp}}).toArray();
            }
            else {
                console.log(typeof +timestamp);
                results = await collection.find({timestamp: {$gte : +timestamp}}).toArray();
            }
            res.json(results);
        }
        catch(e) {
            console.log(e);
            res.json(500);
        }
    });
};

exports.allBuysOfUser = (req, res) => {
    const nutzerId = req.params.id;

    connection().then(async (db) => {
        const collection = db.collection("buy");
        try {
            results = await collection.find({userId: new ObjectId(nutzerId)}).toArray();
            res.json(results);
        }
        catch(e) {
            console.log(e);
            res.json(500);
        }
    });
};