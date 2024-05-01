require("dotenv").config();
const jwt = require("jsonwebtoken");

const createAccessToken = (id) => {
  console.log('created')
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: 60 * 5,
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

const sendAccessToken = (res, req, accesstoken, message) => {
  console.log("sent")
  res.json({
    message,
    accesstoken,
    success: true,
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie("refreshtoken", token, {
    withCredentials: true,
    httpOnly: true,
    sameSite: "Lax",
    secure: "true",
  });
};

module.exports = { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken };
