const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

router.get("/terms", (req, res) => {
  res.render("terms", { title: "Terms" });
});

router.get("/privacy", (req, res) => {
  res.render("privacy", { title: "Privacy" });
});

router.get("/refund", (req, res) => {
  res.render("refund", { title: "Refund" });
});

module.exports = router;