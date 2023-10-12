"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes/api.js");
const app = express();
//const fccTestingRoutes = require("./routes/fcctesting.js");
//const runner = require("./test-runner");
//require("dotenv").config();
//const bodyParser = require("body-parser");
//const expect = require("chai").expect;

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(cors({ origin: "*" })); //For FCC testing purposes only
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: true }));

//front-end
app.route("/:project/").get(function (req, res) {
  res.sendFile("issue.html", {
    root: path.join(__dirname, "../frontend/views"),
  });
});

//Index page
app.route("/").get(function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../frontend/views"),
  });
});

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
  // if (process.env.NODE_ENV === "test") {
  //   console.log("Running Tests...");
  //   setTimeout(function () {
  //     try {
  //       runner.run();
  //     } catch (e) {
  //       console.log("Tests are not valid:");
  //       console.error(e);
  //     }
  //   }, 3500);
  // }
});

module.exports = app; //for testing
