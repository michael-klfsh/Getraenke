module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.post("/", users.create);

    router.get("/:id", users.findOne);

    router.delete("/:id", users.delete);

    app.use('/api/users', router);
};