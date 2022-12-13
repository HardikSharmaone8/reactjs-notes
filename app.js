var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
require("dotenv").config();
var path = require("path");

var port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("./routes/routes"));

//this part of code is described that when we want to use front end part than execute this code otherwise not execute

app.use(express.static(path.join(__dirname, "./inotebook/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./inotebook/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
