const db = require("../config/db.config");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  console.log("someone tried to login");
  const JWT_SECRET = process.env.JWT_SECRET;
  //console.log(JWT_SECRET);
  const { username, password } = req.body;

  const query = `
    SELECT * FROM users WHERE username = ? AND password = ?
  `;

  const values = [username, password];

  db.query(query, values, (error, results) => {
    if (error) {
      console.log("Error querying database:", error);
      return res.status(500).json({ message: "Error logging in." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const user = results[0];

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: { id: user.id, username: user.username },
    });
  });
};
