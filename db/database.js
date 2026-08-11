const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "vms.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to VMS database.");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS volunteers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
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
        )
    `);

    db.get("SELECT COUNT(*) AS count FROM volunteers", (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }
    
        if (row.count === 0) {
            const insertVolunteer = `
                INSERT INTO volunteers (
                    first_name,
                    last_name,
                    username,
                    password,
                    email,
                    skills_interests,
                    availability_times,
                    approval_status
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
    
            db.run(insertVolunteer, [
                "Victoria",
                "Jack",
                "vjack",
                "password123",
                "victoria@example.com",
                "Community Events, Technology",
                "Weekends",
                "Approved"
            ]);
    
            db.run(insertVolunteer, [
                "Alex",
                "Smith",
                "asmith",
                "password123",
                "alex@example.com",
                "Food Services",
                "Weekday Mornings",
                "Pending Approval"
            ]);
    
            db.run(insertVolunteer, [
                "Jordan",
                "Lee",
                "jlee",
                "password123",
                "jordan@example.com",
                "Youth Programs",
                "Evenings",
                "Approved"
            ]);
    
            console.log("Sample volunteers added.");
        }
    });


});

module.exports = db;