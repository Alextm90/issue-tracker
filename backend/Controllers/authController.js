const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../Util/tokens.js");
const RefreshTokenModel = require("../Models/RefreshToken.js");
const isAuth = require("../Middleware/verifyToken.js");

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

    // store token in db
    const newToken = await RefreshTokenModel.create({
      token: refreshToken,
      user: newUser._id,
    });

    // send tokens
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, req, token, "You are now registered.");
  } catch (err) {
    res.send({ error: err.message });
  }
};

// login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check for valid username and password
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

    //create accesstoken/refreshtoken
    const token = createAccessToken(user._id);
    let refreshToken = createRefreshToken(user._id);
    const findToken = await RefreshTokenModel.findOne({ user: user._id });

    // save token to db
    const saveToken = async () => {
      const saved = await RefreshTokenModel.create({
        token: refreshToken,
        user: user._id,
      });
    };

    if (!findToken) {
      console.log("here");
      saveToken();
    } else {
      console.log("here2");
      const deleted = await RefreshTokenModel.deleteOne({ user: user._id });
      saveToken();
    }

    //send both tokens
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, req, token, "You are logged in");
  } catch (err) {
    res.send({ error: err.message });
  }
};

//logout
const logout = async (req, res) => {
  console.log(req.cookies, "refresh");
  try {
    res.clearCookie("refreshtoken", { httpOnly: true, sameSite: "None", secure: true });
    const deleted = await RefreshTokenModel.deleteOne({
      token: req.cookies.refreshtoken,
    });
    return res.json({
      message: "You have successfully logged out!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Protected route for testing - won't be real route.
const protected = async (req, res) => {
  try {
    const userId = isAuth(req, res);
    if (userId !== null) {
      res.send({
        data: "This is protected data.",
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

// Get new access token
const refreshToken = async (req, res) => {
  const token = req.cookies.refreshtoken;
  console.log(token, "tokenn");

  if (!token) return res.send({ accesstoken: "" });

  // verify token
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    console.log("problem here")
    return res.send({ message: "Couldn't verify token." });
  }

  const idToFind = new ObjectId(payload.id);
  try {
    // look for user
    const user = await RefreshTokenModel.findOne({ user: idToFind });
    console.log(user, "user");
    if (!user) return res.send({ accesstoken: "" });

    // user.refreshtoken should equal token
    if (user.token !== token) return res.send({ accesstoken: "" });

    const accesstoken = createAccessToken(user.user);
    console.log(accesstoken, "new token")
    sendAccessToken(res, req, accesstoken, "access granted");
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

module.exports = { registerUser, login, logout, protected, refreshToken };
