const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'buyer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      price TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favourites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      property_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (property_id) REFERENCES properties(id),
      UNIQUE(user_id, property_id)
    )
  `);

  db.get(`SELECT COUNT(*) as count FROM properties`, (err, row) => {
    if (err) {
      console.error("Error checking properties table:", err.message);
      return;
    }

    if (row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO properties (title, location, price, description)
        VALUES (?, ?, ?, ?)
      `);

      const sampleProperties = [
        [
          "Modern Apartment in Kathmandu",
          "Kathmandu",
          "NPR 1,20,00,000",
          "A modern 2-bedroom apartment in the heart of Kathmandu."
        ],
        [
          "Family House in Lalitpur",
          "Lalitpur",
          "NPR 2,50,00,000",
          "Spacious family house with parking and garden."
        ],
        [
          "Studio Flat in Bhaktapur",
          "Bhaktapur",
          "NPR 65,00,000",
          "Affordable studio flat ideal for single buyers."
        ],
        [
          "Luxury Villa in Pokhara",
          "Pokhara",
          "NPR 5,75,00,000",
          "Premium villa with mountain views and private lawn."
        ],
        [
          "Commercial Space in Butwal",
          "Butwal",
          "NPR 1,80,00,000",
          "Commercial property suitable for office or retail use."
        ]
      ];

      sampleProperties.forEach((property) => stmt.run(property));
      stmt.finalize();

      console.log("Sample properties inserted.");
    }
  });
});

module.exports = db;