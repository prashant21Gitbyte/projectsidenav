// /middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token is missing." });
  }

  // Extract the token (assuming it's in the format "Bearer <token>")
  const token = authHeader.split(" ")[1];
  console.log(token);
  // Verify the token
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    console.log(error);

    if (error) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = decoded;

    console.log(req.user);
    next();
  });
};

module.exports = authMiddleware;
