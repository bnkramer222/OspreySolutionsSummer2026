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


    CREATE TABLE IF NOT EXISTS volunteers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    preferred_centers TEXT,
    skills_interests TEXT,
    availability_times TEXT,
    address TEXT,
    phone_numbers TEXT,
    email TEXT,
    educational_background TEXT,
    current_licenses TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_email TEXT,
    emergency_contact_address TEXT,
    drivers_license_on_file INTEGER DEFAULT 0,
    social_security_card_on_file INTEGER DEFAULT 0,
    approval_status TEXT DEFAULT 'Pending Approval'
);
`);

module.exports = db;
