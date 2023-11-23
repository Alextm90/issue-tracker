const db = require("../Config/dbconnect.js");
const express = require("express");
const router = express.Router();
const { registerUser, login, logout, protected, refreshToken } = require("../Controllers/authController.js")

router.post("/signup", registerUser);
router.post("/login", login)
router.post("/logout", logout)
router.post("/protected", protected)
router.post("/refreshtoken", refreshToken)

module.exports = router;
