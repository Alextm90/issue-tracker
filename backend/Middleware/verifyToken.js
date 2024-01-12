const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;
  const accessToken = header && header.split(" ")[1];
  console.log(accessToken, "accesTokenn");
  if (accessToken == null) {
  console.log("now")
  return res.sendStatus(401);
  } 
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
    console.log("error here")
    return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
