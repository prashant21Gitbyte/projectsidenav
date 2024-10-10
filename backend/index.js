const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://172.16.1.13:3000",
};

app.use(cors());
app.use(express.json({ limit: "50mb" })); // Ensure you can handle large base64-encoded data
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Configuring the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app_data",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    return;
  }
  console.log("connected to the MySQL database");
});

app.get("/", (req, res) => {
  res.send("Base64 file upload backend is working.");
});

// Endpoint to handle form submission with base64 file data
app.post("/api/create-app", (req, res) => {
  console.log("thi sis the body received -----------------", req.body);
  const {
    appName,
    color,
    fontStyle,
    fontSize,
    orgType,
    orgUserName,
    orgPassword,
    orgClientID,
    orgSecret,
    approachType,
    logoBase64,
    iconBase64,
    splashScreenBase64,
  } = req.body;

  // Log the incoming data for verification
  console.log("Form Data:", {
    appName,
    color,
    fontStyle,
    fontSize,
    orgType,
    orgUserName,
    orgPassword,
    orgClientID,
    orgSecret,
    approachType,
    logoBase64, // base64 string for logo
    iconBase64, // base64 string for icon
    splashScreenBase64, // base64 string for splash screen
  });

  // SQL query to insert data into the database
  const query = `
    INSERT INTO apps (appName, logo, icon, color, fontStyle, fontSize, orgType, orgUserName, orgPassword, orgClientID, orgSecret, approachType,splashScreen)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    appName,
    logoBase64, // store base64 string in 'logo' field
    iconBase64, // store base64 string in 'icon' field
    color,
    fontStyle,
    fontSize,
    orgType,
    orgUserName,
    orgPassword,
    orgClientID,
    orgSecret,
    approachType,
    splashScreenBase64,
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      console.log("Error inserting data:", error);
      return res
        .status(500)
        .json({ message: "Error saving data to the database." });
    }
    console.log("Data inserted:", results);
    res.json({ message: "App created successfully!", data: req.body });
  });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
