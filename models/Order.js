const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  service: String,
  price: Number,
  status: {
    type: String,
    default: "Active"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);