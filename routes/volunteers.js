const express = require("express");
const router = express.Router();
const db = require("../db/database");


// ------------------------------------
// SEARCH VOLUNTEERS
// GET /api/volunteers/search?q=...
// ------------------------------------

router.get("/search", (req, res) => {
    const searchTerm = req.query.q || "";
    const searchValue = `%${searchTerm}%`;

    const sql = `
        SELECT *
        FROM volunteers
        WHERE first_name LIKE ?
        OR last_name LIKE ?
        OR username LIKE ?
        OR email LIKE ?
    `;

    db.all(
        sql,
        [
            searchValue,
            searchValue,
            searchValue,
            searchValue
        ],
        (err, rows) => {
            if (err) {
                console.error(err.message);

                return res.status(500).json({
                    error: "Unable to search volunteers."
                });
            }

            res.json(rows);
        }
    );
});


// ------------------------------------
// GET ONE VOLUNTEER
// GET /api/volunteers/:id
// ------------------------------------

router.get("/:id", (req, res) => {
    const volunteerId = req.params.id;

    db.get(
        "SELECT * FROM volunteers WHERE id = ?",
        [volunteerId],
        (err, row) => {
            if (err) {
                console.error(err.message);

                return res.status(500).json({
                    error: "Unable to retrieve volunteer."
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: "Volunteer not found."
                });
            }

            res.json(row);
        }
    );
});


// ------------------------------------
// ADD NEW VOLUNTEER
// POST /api/volunteers
// ------------------------------------

router.post("/", (req, res) => {
    const {
        first_name,
        last_name,
        username,
        password,
        preferred_centers,
        skills_interests,
        availability_times,
        address,
        phone_numbers,
        email,
        educational_background,
        current_licenses,
        emergency_contact_name,
        emergency_contact_phone,
        emergency_contact_email,
        emergency_contact_address,
        drivers_license_on_file,
        social_security_card_on_file,
        approval_status
    } = req.body;


    if (
        !first_name ||
        !last_name ||
        !username ||
        !password
    ) {
        return res.status(400).json({
            error:
                "First name, last name, username, and password are required."
        });
    }


    const sql = `
        INSERT INTO volunteers (
            first_name,
            last_name,
            username,
            password,
            preferred_centers,
            skills_interests,
            availability_times,
            address,
            phone_numbers,
            email,
            educational_background,
            current_licenses,
            emergency_contact_name,
            emergency_contact_phone,
            emergency_contact_email,
            emergency_contact_address,
            drivers_license_on_file,
            social_security_card_on_file,
            approval_status
        )
        VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
    `;


    db.run(
        sql,
        [
            first_name,
            last_name,
            username,
            password,
            preferred_centers || "",
            skills_interests || "",
            availability_times || "",
            address || "",
            phone_numbers || "",
            email || "",
            educational_background || "",
            current_licenses || "",
            emergency_contact_name || "",
            emergency_contact_phone || "",
            emergency_contact_email || "",
            emergency_contact_address || "",
            drivers_license_on_file || 0,
            social_security_card_on_file || 0,
            approval_status || "Pending Approval"
        ],
        function (err) {
            if (err) {
                console.error(err.message);

                if (
                    err.message.includes("UNIQUE")
                ) {
                    return res.status(400).json({
                        error:
                            "That username is already in use."
                    });
                }

                return res.status(500).json({
                    error:
                        "Unable to add volunteer."
                });
            }


            res.status(201).json({
                message:
                    "Volunteer added successfully.",
                id: this.lastID
            });
        }
    );
});


// ------------------------------------
// EDIT VOLUNTEER
// PUT /api/volunteers/:id
// ------------------------------------

router.put("/:id", (req, res) => {
    const volunteerId = req.params.id;

    const {
        first_name,
        last_name,
        username,
        password,
        preferred_centers,
        skills_interests,
        availability_times,
        address,
        phone_numbers,
        email,
        educational_background,
        current_licenses,
        emergency_contact_name,
        emergency_contact_phone,
        emergency_contact_email,
        emergency_contact_address,
        drivers_license_on_file,
        social_security_card_on_file,
        approval_status
    } = req.body;


    if (
        !first_name ||
        !last_name ||
        !username ||
        !password
    ) {
        return res.status(400).json({
            error:
                "First name, last name, username, and password are required."
        });
    }


    const sql = `
        UPDATE volunteers
        SET
            first_name = ?,
            last_name = ?,
            username = ?,
            password = ?,
            preferred_centers = ?,
            skills_interests = ?,
            availability_times = ?,
            address = ?,
            phone_numbers = ?,
            email = ?,
            educational_background = ?,
            current_licenses = ?,
            emergency_contact_name = ?,
            emergency_contact_phone = ?,
            emergency_contact_email = ?,
            emergency_contact_address = ?,
            drivers_license_on_file = ?,
            social_security_card_on_file = ?,
            approval_status = ?
        WHERE id = ?
    `;


    db.run(
        sql,
        [
            first_name,
            last_name,
            username,
            password,
            preferred_centers || "",
            skills_interests || "",
            availability_times || "",
            address || "",
            phone_numbers || "",
            email || "",
            educational_background || "",
            current_licenses || "",
            emergency_contact_name || "",
            emergency_contact_phone || "",
            emergency_contact_email || "",
            emergency_contact_address || "",
            drivers_license_on_file || 0,
            social_security_card_on_file || 0,
            approval_status || "Pending Approval",
            volunteerId
        ],
        function (err) {
            if (err) {
                console.error(err.message);

                if (
                    err.message.includes("UNIQUE")
                ) {
                    return res.status(400).json({
                        error:
                            "That username is already in use."
                    });
                }

                return res.status(500).json({
                    error:
                        "Unable to update volunteer."
                });
            }


            if (this.changes === 0) {
                return res.status(404).json({
                    error:
                        "Volunteer not found."
                });
            }


            res.json({
                message:
                    "Volunteer updated successfully."
            });
        }
    );
});


// ------------------------------------
// VIEW OPPORTUNITY MATCHES
// GET /api/volunteers/:id/matches
// ------------------------------------

// For now, this route returns sample matches.
// We can connect it to the real opportunities
// table once that part of the project exists.

router.get("/:id/matches", (req, res) => {
    const volunteerId = req.params.id;

    db.get(
        "SELECT * FROM volunteers WHERE id = ?",
        [volunteerId],
        (err, volunteer) => {
            if (err) {
                console.error(err.message);

                return res.status(500).json({
                    error:
                        "Unable to retrieve volunteer."
                });
            }

            if (!volunteer) {
                return res.status(404).json({
                    error:
                        "Volunteer not found."
                });
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
                volunteer:
                    `${volunteer.first_name} ${volunteer.last_name}`,

                matches: matches
            });
        }
    );
});


module.exports = router;