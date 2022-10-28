var mongoose = require("mongoose");
require("dotenv");

console.log("database", process.env.DATABASE);

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database Connection Succesfully established");
  })
  .catch((err) => {
    console.log("error occure while connect to mongoDB", err);
  });
