//https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    //Gebe nur Anfragen von dieser Origin durch
    origin: ["https://michael-klfsh.github.io/Getraenke/", "http://192.168.178.147:8080/"]
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/getraenke.routes")(app);
require("./app/routes/buy.routes")(app);

//Setzt Port auf 8080 (falls keine Umgebungsvariable PORT existiert)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
