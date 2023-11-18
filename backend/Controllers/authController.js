const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;
const { createAccessToken, createRefreshToken } = require("../Util/tokens.js");
const RefreshToken = require("../Models/RefreshToken.js");

// Register user
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.json({ message: "Username already taken", success: false });
    }

    // create password/user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    // create tokens
    const token = createAccessToken(newUser._id);
    const refreshToken = createRefreshToken(newUser._id);

    const userToken = await RefreshToken.create({
      token: refreshToken,
      user: newUser._id,
    });

    // send tokens
    res.cookie("token", refreshToken, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "None",
      secure: "true",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "User registered successfully",
      success: true,
      accessToken: token,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
};

// login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect password or username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ message: "Incorrect password or username" });
    }
    //const token = createAccessToken(myObjectIdString);
    const refreshToken = createRefreshToken(user._id);
    // save token to db

    const userToken = await RefreshToken.create({
      token: refreshToken,
      user: user._id,
    });


    res.json({ message: "You are logged in" });
  } catch (err) {
    res.send({ error: err.message });
  }
};

module.exports = { registerUser, login };

// {
//     "username": "alextm19",
//     "password": "Cheese01"
// }
