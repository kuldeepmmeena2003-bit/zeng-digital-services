const express = require("express");
const router = express.Router();

// Checkout page
router.get("/checkout/:id", (req, res) => {
  const order = {
    _id: req.params.id,
    service: "Digital Service",
    name: "Customer",
    email: "customer@email.com",
    price: 499
  };

  res.render("checkout", { order });
});

// Payment trigger (dummy)
router.post("/pay/:id", (req, res) => {
  res.redirect("/success");
});

// Success page
router.get("/success", (req, res) => {
  res.render("success");
});

// Cancel page
router.get("/cancel", (req, res) => {
  res.render("cancel");
});

module.exports = router;