const express = require("express");
const path = require("path");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAuth, (req, res) => {

    res.sendFile(
        path.join(__dirname, "../views/volunteers.html")
    );

});

module.exports = router;