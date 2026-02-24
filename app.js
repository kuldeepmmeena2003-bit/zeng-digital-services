const express = require("express");
const path = require("path");

const app = express();

// ====== PORT (Render compatible) ======
const PORT = process.env.PORT || 5000;

// ====== MIDDLEWARE ======
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ====== STATIC FILES ======
app.use(express.static(path.join(__dirname, "public")));

// ====== VIEW ENGINE ======
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ====== MAIN WEBSITE ROUTES ======
app.get("/", (req, res) => res.render("home"));
app.get("/services", (req, res) => res.render("services"));
app.get("/pricing", (req, res) => res.render("pricing"));
app.get("/portfolio", (req, res) => res.render("portfolio"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));

// ====== ADMIN ROUTES ======
app.get("/admin", (req, res) => res.render("admin-login"));
app.get("/admin/dashboard", (req, res) => res.render("admin-dashboard"));
app.get("/admin/orders", (req, res) => res.render("admin-orders"));

// ====== 404 PAGE ======
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// ====== SERVER START ======
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});