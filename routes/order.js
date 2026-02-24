const express = require("express");
const router = express.Router();

/* Order page */
router.get("/order", (req, res) => {
  res.render("order", { title: "Order" });
});

/* Success */
router.get("/payment-success", (req, res) => {
  res.render("payment-success", { title: "Payment Success" });
});

module.exports = router;