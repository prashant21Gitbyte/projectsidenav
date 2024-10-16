// app.js
const express = require("express");
const cors = require("cors");
const appRoutes = require("./routes/app.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();
//console.log(process.env.JWT_SECRET);

const corsOptions = {
  origin: "http://172.16.1.193:3000",
  credentials: true,
};
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Base route
app.get("/", (req, res) => {
  res.send("Backend with Base64 features working fine, GO AHEAD👍");
});

// Use app routes
app.use("/api", appRoutes);
app.use("/api", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
