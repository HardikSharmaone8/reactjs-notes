var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var { JWT_SECRET, MONGOURL } = require("./config/keys");
require("dotenv").config();

var port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("./routes/routes"));

//this part of code is described that when we want to use front end part than execute this code otherwise not execute

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "inotebook", "build")));
    res.sendFile(path.resolve(__dirname, "inotebook", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
