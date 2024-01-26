const CONFIG = require("./config/config.json");
const MongoClient = require("mongodb").MongoClient;
const connectionString = CONFIG.connectionURL || "";

const client = new MongoClient(connectionString);
let connection;

module.exports = async function connectToDB() {
  try {
    console.log(connectionString);
    connection = await client.connect();
    console.log("Connected");
  } catch (e) {
    console.error(e);
  }
  return (db = connection.db("getraenke-kuehlschrank"));
};