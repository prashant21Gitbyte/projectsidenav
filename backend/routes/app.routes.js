// /routes/app.routes.js
const express = require("express");
const router = express.Router();
const appController = require("../controllers/app.controller");

// Define routes for the app
router.post("/create-app", appController.createApp);
router.get("/get-app/:id", appController.getAppById);
router.put("/update-app", appController.updateApp);

module.exports = router;
