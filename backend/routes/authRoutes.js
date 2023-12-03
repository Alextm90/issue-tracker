const db = require("../Config/dbconnect.js");
const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  logout,
  refreshToken,
} = require("../Controllers/authController.js");

router.route("/signup").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refreshtoken").get(refreshToken);

module.exports = router;
