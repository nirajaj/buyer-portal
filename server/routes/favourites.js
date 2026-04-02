const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.all(
    `
    SELECT p.id, p.title, p.location, p.price, p.description
    FROM favourites f
    JOIN properties p ON f.property_id = p.id
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC
    `,
    [userId],
    (err, favourites) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch favourites.", error: err.message });
      }

      return res.status(200).json(favourites);
    }
  );
});

router.post("/", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { propertyId } = req.body;

  if (!propertyId) {
    return res.status(400).json({ message: "Property ID is required." });
  }

  db.get(`SELECT * FROM properties WHERE id = ?`, [propertyId], (err, property) => {
    if (err) {
      return res.status(500).json({ message: "Database error.", error: err.message });
    }

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    db.run(
      `INSERT INTO favourites (user_id, property_id) VALUES (?, ?)`,
      [userId, propertyId],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.status(409).json({ message: "Property is already in favourites." });
          }

          return res.status(500).json({ message: "Failed to add favourite.", error: err.message });
        }

        return res.status(201).json({ message: "Property added to favourites successfully." });
      }
    );
  });
});

router.delete("/:propertyId", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const propertyId = req.params.propertyId;

  db.run(
    `DELETE FROM favourites WHERE user_id = ? AND property_id = ?`,
    [userId, propertyId],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to remove favourite.", error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Favourite not found." });
      }

      return res.status(200).json({ message: "Property removed from favourites successfully." });
    }
  );
});

module.exports = router;