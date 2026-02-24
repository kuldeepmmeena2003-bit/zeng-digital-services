const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);