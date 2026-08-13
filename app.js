const express = require("express");
const path = require("path");
const session = require("express-session");
const requireAuth = require("./middleware/requireAuth");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "temporary-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60
        }
    })
);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const volunteerRoutes = require("./routes/volunteerRoutes");
app.use("/volunteers", volunteerRoutes);

const volunteerApi = require("./routes/volunteers");
app.use("/api/volunteers", volunteerApi);



const opportunityRoutes = require("./routes/opportunityRoutes");
app.use("/opportunities", opportunityRoutes);

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/volunteers", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "volunteers.html"));
});

app.get("/volunteer-form", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "volunteer-form.html"));
});

app.get("/dashboard", requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});