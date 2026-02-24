const express = require("express");
const path = require("path");

const app = express();

// ===== SETTINGS =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== STATIC FILES =====
app.use(express.static(path.join(__dirname, "public")));

// ===== MAINTENANCE MODE =====
const maintenanceMode = false;

app.use((req, res, next) => {
  if (maintenanceMode && req.path !== "/maintenance") {
    return res.redirect("/maintenance");
  }
  next();
});

app.get("/maintenance", (req, res) => {
  res.send(`
    <h1>Site Under Maintenance</h1>
    <p>We are updating our website. Please check back later.</p>
  `);
});

// ===== HOME =====
app.get("/", (req, res) => {
  res.render("home");
});

// ===== SERVICES =====
app.get("/services", (req, res) => {
  res.render("services");
});

// ===== ORDER =====
app.get("/order/:service", (req, res) => {
  const service = req.params.service;

  const prices = {
    website: 4999,
    seo: 2999,
    social: 3999
  };

  res.render("order", {
    service: service,
    price: prices[service]
  });
});

// ===== PAYMENT =====
app.get("/pay/:service", (req, res) => {
  const service = req.params.service;

  const prices = {
    website: 4999,
    seo: 2999,
    social: 3999
  };

  res.render("payment", {
    service: service,
    price: prices[service]
  });
});

// ===== POLICIES =====
app.get("/privacy", (req, res) => {
  res.render("privacy");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/refund", (req, res) => {
  res.render("refund");
});

// ===== ABOUT =====
app.get("/about", (req, res) => {
  res.render("about");
});

// ===== CONTACT =====
app.get("/contact", (req, res) => {
  res.render("contact");
});

// ===== PRICING =====
app.get("/pricing", (req, res) => {
  res.render("pricing");
});

// ===== SERVER =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});