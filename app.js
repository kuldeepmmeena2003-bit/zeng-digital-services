const express = require("express");
const path = require("path");

const app = express();

// ===== SETTINGS =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== STATIC =====
app.use(express.static(path.join(__dirname, "public")));

// ===== MAINTENANCE MODE =====
const maintenanceMode = false; // true = site बंद

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

// ===== PAY =====
app.get("/pay/:service", (req, res) => {
  const service = req.params.service;

  const prices = {
    website: 4999,
    seo: 2999,
    social: 3999
  };

  res.send(`
    <h1>Payment Page</h1>
    <p>Service: ${service}</p>
    <p>Amount: ₹${prices[service]}</p>
    <p>Cashfree payment integration coming here</p>
    <a href="/">Back to Home</a>
  `);
});

// ===== POLICIES =====
app.get("/privacy", (req, res) => {
  res.send("<h1>Privacy Policy</h1><p>Privacy policy content here.</p>");
});

app.get("/terms", (req, res) => {
  res.send("<h1>Terms & Conditions</h1><p>Terms content here.</p>");
});

app.get("/refund", (req, res) => {
  res.send("<h1>Refund Policy</h1><p>Refund policy content here.</p>");
});

// ===== SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});