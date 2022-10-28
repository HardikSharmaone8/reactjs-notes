var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
require("dotenv").config();

var port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("./routes/routes"));

app.get("/", (req, res) => {
  res.send("hello world");
});

//this part of code is described that when we want to use front end part than execute this code otherwise not execute

if (process.env.NODE_ENV === "production") {
  app.use(express.static("inotebook/build"));
}

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
