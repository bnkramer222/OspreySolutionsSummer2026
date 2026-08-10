const { Router } = require("express");

const router = Router();


router.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (email === "admin@test.com" && password === "p123") {

        req.session.admin = {
            email: email
        };

        res.json({
            success: true
        });

    } else {

        res.status(401).json({
            success: false,
            message: "Login denied"
        });

    }
});

module.exports = router;