var mongoose = require("mongoose");
var { JWT_SECRET, MONGOURL } = require("../config/keys");
require("dotenv");

console.log("database", MONGOURL);

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database Connection Succesfully established");
  })
  .catch((err) => {
    console.log("error occure while connect to mongoDB", err);
  });
