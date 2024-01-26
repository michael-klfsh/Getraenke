module.exports = app => {
    const getraenke = require("../controllers/getraenke.controller.js");

    var router = require("express").Router();

    router.post("/", getraenke.create);

    router.get("/", getraenke.findAll);

    router.get("/:id", getraenke.findOne);

    router.delete("/:id", getraenke.delete);
    

    app.use('/api/getraenke', router);
};