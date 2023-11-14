const db = require("../Config/dbconnect.js");
const express = require("express");
const router = express.Router();
const registerUser = require("../Controllers/userController.js")

router.post("/signup", registerUser);

module.exports = router;
