const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  db.all(`SELECT * FROM properties ORDER BY id DESC`, [], (err, properties) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch properties.", error: err.message });
    }

    return res.status(200).json(properties);
  });
});

module.exports = router;