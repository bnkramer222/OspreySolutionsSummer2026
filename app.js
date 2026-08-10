const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "js");

app.get("/", (req, res) => {
    res.render("login");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});