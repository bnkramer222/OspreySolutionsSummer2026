const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password123") {
        return res.json({ message: "Login successful" });
    }

    res.status(401).json({
        error: "Invalid username or password."
    });
});

module.exports = router;