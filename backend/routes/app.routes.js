// /routes/app.routes.js
const express = require("express");
const router = express.Router();
const appController = require("../controllers/app.controller");
const authMiddleware = require("../middleware/authMiddleware");

// Define routes for the app
router.post("/create-app", authMiddleware, appController.createApp);
router.get("/get-app/:id", authMiddleware, appController.getAppById);
router.put("/update-app", authMiddleware, appController.updateApp);

module.exports = router;
