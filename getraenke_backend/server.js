//https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    //Gebe nur Anfragen von dieser Origin durch
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
//force: resync databse (drop existing tables)
db.sequelize.sync({ force:true });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

//Setzt Port auf 8080 (falls keine Umgebungsvariable PORT existiert)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });