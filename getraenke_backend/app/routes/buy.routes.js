module.exports = app => {
    const buy = require("../controllers/buy.controller.js");
    var router = require("express").Router();

    router.post("/:id/getraenk", buy.addBuy);

    router.get("/:id/getraenk", buy.allBuysOfUser);

    router.get("/:id/from/:start", buy.findBuy);

    router.get("/:id/getraenk/:getraenkid/from/:start", buy.findBuy);

    app.use('/api/user', router);
};