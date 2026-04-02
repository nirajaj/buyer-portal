require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

require("./db");

const authRoutes = require("./routes/auth");
const propertiesRoutes = require("./routes/properties");
const favouritesRoutes = require("./routes/favourites");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/favourites", favouritesRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dashboard.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});