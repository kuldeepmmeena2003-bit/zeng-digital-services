const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zengdigitalservices.info@gmail.com",
    pass: "qdraqxrearuhvkrp"
  }
});

exports.sendOrderEmail = (to, orderId, service, amount) => {
  return transporter.sendMail({
    from: '"Zeng Digital" <zengdigitalservices.info@gmail.com>',
    to,
    subject: "Order Received - Zeng Digital",
    html: `
      <h2>Thank you for your order</h2>
      <p><b>Order ID:</b> ${orderId}</p>
      <p><b>Service:</b> ${service}</p>
      <p><b>Amount:</b> ₹${amount}</p>
      <p>Please complete payment using UPI and submit UTR on website.</p>
      <p>Support: +91 9521070057</p>
    `
  });
};

exports.sendPaymentEmail = (to, orderId) => {
  return transporter.sendMail({
    from: '"Zeng Digital" <zengdigitalservices.info@gmail.com>',
    to,
    subject: "Payment Verified - Zeng Digital",
    html: `
      <h2>Payment Confirmed</h2>
      <p>Your payment for order <b>${orderId}</b> has been verified.</p>
      <p>We have started your digital service.</p>
      <p>Support: zengdigitalservices.info@gmail.com</p>
    `
  });
};