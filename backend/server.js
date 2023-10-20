"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes/api.js"); //might need to capitalize Routes
const app = express();
require("dotenv").config();
//const bodyParser = require("body-parser");
//const expect = require("chai").expect;

//app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(cors({ origin: "*" })); //For FCC testing purposes only
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: true }));

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
