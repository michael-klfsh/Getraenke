module.exports = app => {
    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.post("/", user.create);

    router.get("/:id", user.findOne);

    router.delete("/:id", user.delete);

    router.post("/:id/getraenk", user.addBuy);

    router.get("/:id/getraenk", user.allBuysOfUser);

    router.get("/:id/from/:start-time", user.findBuy);

    router.get("/:id/getraenk/:getraenk-id/from/:start-time", user.findBuy);


    app.use('/api/user', router);
};