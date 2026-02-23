const express = require("express");
const router = express.Router();

// HOME
router.get("/", (req, res) => {
  res.render("home");
});

// ABOUT
router.get("/about", (req, res) => {
  res.render("about");
});

// SERVICES
router.get("/services", (req, res) => {
  const services = [
    { name: "Website Design", price: 4999 },
    { name: "SEO Optimization", price: 2999 },
    { name: "Logo Design", price: 1499 },
    { name: "E-commerce Setup", price: 7999 }
  ];
  res.render("services", { services });
});

// CHECKOUT PAGE
router.get("/checkout/:service/:price", (req, res) => {
  res.render("checkout", {
    service: req.params.service,
    price: req.params.price
  });
});

// PAYMENT SUCCESS
router.get("/payment-success", (req, res) => {
  res.render("payment-success");
});

// CONTACT
router.get("/contact", (req, res) => {
  res.render("contact");
});

// LEGAL PAGES
router.get("/privacy-policy", (req, res) => res.render("privacy"));
router.get("/terms", (req, res) => res.render("terms"));
router.get("/refund-policy", (req, res) => res.render("refund"));
router.get("/delivery-policy", (req, res) => res.render("delivery"));

module.exports = router;