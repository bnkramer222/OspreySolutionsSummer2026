const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "vms.db"));

db.exec(`
    CREATE TABLE IF NOT EXISTS opportunities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        center TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT,
        skills_needed TEXT,
        status TEXT DEFAULT 'Active'
    );

    CREATE TABLE IF NOT EXISTS volunteer_opportunity_matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        volunteer_id INTEGER,
        opportunity_id INTEGER
    );
`);

module.exports = db;