// /config/db.config.js
const mysql = require("mysql2");

// Database configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app_data",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

module.exports = db;
