const db = require("../config/db.config");

exports.login = (req, res) => {
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

    // If credentials are correct, you can generate a token or return success.
    res.json({ message: "Login successful!", user: results[0] });
  });
};
