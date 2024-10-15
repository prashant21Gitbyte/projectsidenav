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

//update app

exports.updateApp = (req, res) => {
  const {
    appId,
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
    UPDATE apps SET appName = ?, logo = ?, icon = ?, color = ?, fontStyle = ?, fontSize = ?, orgType = ?, orgUserName = ?, orgPassword = ?, orgClientID = ?, orgSecret = ?, approachType = ?, splashScreen = ?
    WHERE id = ?
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
    appId,
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      console.log("Error updating data:", error);
      return res.status(500).json({ message: "Error updating the app." });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "App not found." });
    }

    console.log("Data updated:", results);
    res.json({ message: "App updated successfully!", data: req.body });
  });
};
// /controllers/getapp

exports.getAppById = (req, res) => {
  const { id } = req.params;
  //console.log("this is reached here for id", id);
  const query = `SELECT * FROM apps WHERE id = ?`;

  db.query(query, [id], (error, results) => {
    if (error) {
      console.log("Error fetching app data:", error);
      return res.status(500).json({ message: "Error fetching app data." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "App not found." });
    }

    // Returning the app data if found
    res.json({ data: results[0] });
  });
};

//delete app

exports.deleteApp = (req, res) => {
  const { id } = req.params;
  //console.log(id);

  // SQL query to delete the app by ID
  const query = `DELETE FROM apps WHERE id = ?`;

  db.query(query, [id], (error, results) => {
    if (error) {
      console.log("Error deleting app:", error);
      return res.status(500).json({ message: "Error deleting app." });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "App not found." });
    }

    // If the deletion was successful
    res.json({ message: "App deleted successfully." });
  });
};
