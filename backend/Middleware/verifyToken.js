const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const accessToken = header && header.split(" ")[1];
  console.log(accessToken, "accesTokenn")
  if (accessToken == null) return res.sendStatus(401)
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
  });
  next()
};

module.exports = verifyToken