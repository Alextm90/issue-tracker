const jwt = require("jsonwebtoken");
const Users = require("../Models/users.js");
const express = require("express");
const User = require("../Models/users.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });

  if (user) {
    return res.json({ message: "Username already taken", success: false });
  }

  //create password/user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword });

  //create token
  const token =  await createToken(newUser._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: true,
  });

  res.json({ message: "User registered successfully", success: true });
};

createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });

};

module.exports = registerUser;
