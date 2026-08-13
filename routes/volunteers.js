const express = require("express");
const router = express.Router();
const db = require("../db/database");

// retrieve all volunteers
router.get("/", (req, res) => {
    try {
        const volunteers = db.prepare("SELECT * FROM volunteers").all();
        res.json(volunteers);
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve volunteers." });
    }
});

// searching volunteers
router.get("/search", (req, res) => {
    try {
        const search = "%" + (req.query.q || "") + "%";

        const sql = "SELECT * FROM volunteers WHERE first_name LIKE ? OR last_name LIKE ? OR username LIKE ? OR email LIKE ?";

        const volunteers = db.prepare(sql).all(
            search,
            search,
            search,
            search
        );

        res.json(volunteers);
    } catch (error) {
        res.status(500).json({ error: "Unable to search volunteers." });
    }
});

// get one volunteer
router.get("/:id", (req, res) => {
    try {
        const volunteer = db
            .prepare("SELECT * FROM volunteers WHERE id = ?")
            .get(req.params.id);

        if (!volunteer) {
            return res.status(404).json({ error: "Volunteer not found." });
        }

        res.json(volunteer);
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve volunteer." });
    }
});

// add volunteer
router.post("/", (req, res) => {
    const v = req.body;

    if (!v.first_name || !v.last_name || !v.username || !v.password) {
        return res.status(400).json({
            error: "First name, last name, username, and password are required."
        });
    }

    const sql = "INSERT INTO volunteers (first_name, last_name, username, password, preferred_centers, skills_interests, availability_times, address, phone_numbers, email, educational_background, current_licenses, emergency_contact_name, emergency_contact_phone, emergency_contact_email, emergency_contact_address, drivers_license_on_file, social_security_card_on_file, approval_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
        v.first_name,
        v.last_name,
        v.username,
        v.password,
        v.preferred_centers || "",
        v.skills_interests || "",
        v.availability_times || "",
        v.address || "",
        v.phone_numbers || "",
        v.email || "",
        v.educational_background || "",
        v.current_licenses || "",
        v.emergency_contact_name || "",
        v.emergency_contact_phone || "",
        v.emergency_contact_email || "",
        v.emergency_contact_address || "",
        v.drivers_license_on_file || 0,
        v.social_security_card_on_file || 0,
        v.approval_status || "Pending Approval"
    ];

    try {
        const result = db.prepare(sql).run(...values);

        res.status(201).json({
            message: "Volunteer added successfully.",
            id: result.lastInsertRowid
        });
    } catch (error) {
        if (error.message.includes("UNIQUE")) {
            return res.status(400).json({
                error: "That username is already in use."
            });
        }

        res.status(500).json({ error: "Unable to add volunteer." });
    }
});

// edit volunteer
router.put("/:id", (req, res) => {
    const v = req.body;

    if (!v.first_name || !v.last_name || !v.username || !v.password) {
        return res.status(400).json({
            error: "First name, last name, username, and password are required."
        });
    }

    const sql = "UPDATE volunteers SET first_name = ?, last_name = ?, username = ?, password = ?, preferred_centers = ?, skills_interests = ?, availability_times = ?, address = ?, phone_numbers = ?, email = ?, educational_background = ?, current_licenses = ?, emergency_contact_name = ?, emergency_contact_phone = ?, emergency_contact_email = ?, emergency_contact_address = ?, drivers_license_on_file = ?, social_security_card_on_file = ?, approval_status = ? WHERE id = ?";

    const values = [
        v.first_name,
        v.last_name,
        v.username,
        v.password,
        v.preferred_centers || "",
        v.skills_interests || "",
        v.availability_times || "",
        v.address || "",
        v.phone_numbers || "",
        v.email || "",
        v.educational_background || "",
        v.current_licenses || "",
        v.emergency_contact_name || "",
        v.emergency_contact_phone || "",
        v.emergency_contact_email || "",
        v.emergency_contact_address || "",
        v.drivers_license_on_file || 0,
        v.social_security_card_on_file || 0,
        v.approval_status || "Pending Approval",
        req.params.id
    ];

    try {
        const result = db.prepare(sql).run(...values);

        if (result.changes === 0) {
            return res.status(404).json({ error: "Volunteer not found." });
        }

        res.json({ message: "Volunteer updated successfully." });
    } catch (error) {
        if (error.message.includes("UNIQUE")) {
            return res.status(400).json({
                error: "That username is already in use."
            });
        }

        res.status(500).json({ error: "Unable to update volunteer." });
    }
});

// view opportunity matches
router.get("/:id/matches", (req, res) => {
    try {
        const volunteer = db
            .prepare("SELECT * FROM volunteers WHERE id = ?")
            .get(req.params.id);

        if (!volunteer) {
            return res.status(404).json({ error: "Volunteer not found." });
        }

        const matches = [
            {
                id: 1,
                name: "Community Food Drive",
                center: "Downtown Center"
            },
            {
                id: 2,
                name: "Youth Tutoring Program",
                center: "Northside Center"
            }
        ];

        res.json({
            volunteer: volunteer.first_name + " " + volunteer.last_name,
            matches: matches
        });
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve volunteer." });
    }
});

module.exports = router;