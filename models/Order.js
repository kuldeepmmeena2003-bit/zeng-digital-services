const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: String,
    service: String,
    amount: Number,
    customerName: String,
    email: String,
    phone: String,

    paymentMethod: { type: String, default: "UPI" },
    utr: String,
    status: { type: String, default: "pending_payment" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);