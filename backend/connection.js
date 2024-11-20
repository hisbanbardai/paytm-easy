const { Client } = require("pg");
require("dotenv").config();

const client = new Client(process.env.DATABASE_URL);

client
  .connect()
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

module.exports = client;
