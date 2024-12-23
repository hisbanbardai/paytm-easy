const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const authMiddleware = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({ message: "You are not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      return next();
    }

    return res.status(403).json({ message: "You are not authorized" });
  } catch (error) {
    return res.status(403).json({ message: "You are not authorized" });
  }
};

module.exports = authMiddleware;
