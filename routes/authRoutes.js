const { Router } = require("express");

const router = Router();

router.post("/login", authController.login);