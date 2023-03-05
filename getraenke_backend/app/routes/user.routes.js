module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.post("/", users.create);

    router.get("/:id", users.findById);

    router.delete("/:id", users.remove);

    router.post("/:id/getraenk", );

    router.get("/:id/from/:start-time", );

    router.get("/:id/from/:start-time/to/:end-time", );

    router.get("/:id/getraenk/:getraenk-id/from/:start-time", );

    router.get("/:id/getraenk/:getraenk-id/from/:start-time/to/:end-time", );


    app.use('/api/users', router);
};