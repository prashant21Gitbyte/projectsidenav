// app.js
const express = require("express");
const cors = require("cors");
const appRoutes = require("./routes/app.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" })); // Handle large base64-encoded data
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Base route
app.get("/", (req, res) => {
  res.send("Base64 file upload backend is working.");
});

// Use app routes
app.use("/api", appRoutes);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
