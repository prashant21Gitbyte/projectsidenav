// /middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token is missing." });
  }

  // Extract the token (assuming it's in the format "Bearer <token>")
  const token = authHeader.split(" ")[1];

  // Verify the token
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = decoded;

    console.log(req.user);
    next();
  });
};

module.exports = authMiddleware;
