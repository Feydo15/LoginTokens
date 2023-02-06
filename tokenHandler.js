const jwt = require("jsonwebtoken");

const createToken = (user) => {
  var token = jwt.sign(
    { email: user.email},
    "tryAgainLater"
  );
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      // cut using slice or
      var decoded = jwt.verify(token, token.split('.')[1]);
      console.log("Decoded details", decoded);
      next();
    } catch (e) {
      return res.send(401,console.log("Denied"));
    }
  }
};

module.exports = { createToken, verifyToken };
