require("dotenv").config();
const jwt = require("jsonwebtoken");

const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET);
};

module.exports = { createAccessToken, createRefreshToken };
