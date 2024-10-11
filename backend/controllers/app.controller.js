// /controllers/app.controller.js
const db = require("../config/db.config");

exports.createApp = (req, res) => {
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

  const query = `
    INSERT INTO apps (appName, logo, icon, color, fontStyle, fontSize, orgType, orgUserName, orgPassword, orgClientID, orgSecret, approachType, splashScreen)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    appName,
    logoBase64,
    iconBase64,
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
};
