const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://172.16.1.70:3000",

  // credentials: true,
};

app.use(cors(corsOptions));

// Middleware
//app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuring the database
/*
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app_data",
});
*/
const db = mysql.createConnection({
  host: "103.171.45.175",
  user: "newkabir_montra",
  password: "]_nO-VH?f[Y_",
  database: "newkabir_montra",
});

db.connect((err) => {
  if (err) {
    console.err("Database connection failed");
    return;
  }
  console.log("connected to the MySQL database");
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  console.log("helloe");
  res.send("this is reached");
});
// Endpoint to handle the form submission
app.post(
  "/api/create-app",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "icon", maxCount: 1 },
    { name: "splashScreen", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("hello, did you made this request");

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
    } = req.body;

    // You can perform additional processing or validation here

    // Log the data to the console (or save it to a database)
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
      files: req.files,
    });

    //config the response
    const logoPath = req.files.logo[0].filename; // Get the filename of the logo
    const iconPath = req.files.icon[0].filename; // Get the filename of the icon
    const splashScreenPath = req.files.splashScreen[0].filename; // Get the filename of the splash screen

    // SQL query to insert data into the database
    const query = `
      INSERT INTO apps (appName, logo, icon, color, fontStyle, fontSize, orgType, orgUserName, orgPassword, orgClientID, orgSecret, approachType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      appName,
      logoPath,
      iconPath,
      color,
      fontStyle,
      fontSize,
      orgType,
      orgUserName,
      orgPassword,
      orgClientID,
      orgSecret,
      approachType,
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

    // Send response
    //res.json({ message: "App created successfully!", data: req.body });
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
