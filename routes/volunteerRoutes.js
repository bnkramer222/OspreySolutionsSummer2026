const express = require("express");
const path = require("path");
const requireAuth = require("../middleware/requireAuth");
const db = require("../db/database");

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/volunteers.html"));
});

router.get("/:id/matches", requireAuth, (req, res) => {
    const matches = db.prepare(`
        SELECT opportunities.* FROM opportunities
        INNER JOIN volunteer_opportunity_matches
        ON opportunities.id = volunteer_opportunity_matches.opportunity_id
        WHERE volunteer_opportunity_matches.volunteer_id = ?
    `).all(req.params.id);
    res.json({ matches });
});

module.exports = router;