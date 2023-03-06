module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.post("/", users.create);

    router.get("/:id", users.findOne);

    router.delete("/:id", users.delete);

    router.post("/:id/getraenk", user.addBuy);

    router.get("/:id/getraenk", user.allBuysOfUser);

    router.get("/:id/from/:start-time", user.findBuy);

    router.get("/:id/getraenk/:getraenk-id/from/:start-time", user.findBuy);


    app.use('/api/users', router);
};