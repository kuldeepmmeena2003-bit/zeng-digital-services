const express = require("express");
const router = express.Router();

// Home
router.get("/", (req, res) => {
  res.render("home");
});

// Services
router.get("/services", (req, res) => {
  res.render("services");
});

// Pricing
router.get("/pricing", (req, res) => {
  res.render("pricing");
});

// About
router.get("/about", (req, res) => {
  res.render("about");
});

// Contact
router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;