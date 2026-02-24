const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== SETTINGS =====
const SITE_NAME = "Zeng Digital Services";
const ADMIN_EMAIL = "yourgmail@gmail.com"; // change
const MAINTENANCE_MODE = false;

// ===== MIDDLEWARE =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ===== SERVICE PRICES =====
const services = {
  "Instagram Followers": 499,
  "Instagram Likes": 299,
  "YouTube Views": 399,
  "YouTube Subscribers": 799,
  "Website Development": 4999,
  "SEO Optimization": 2999
};

// ===== HOME =====
app.get("/", (req, res) => {
  if (MAINTENANCE_MODE) return res.render("maintenance");
  res.render("index", { siteName: SITE_NAME });
});

// ===== PRICING =====
app.get("/pricing", (req, res) => {
  res.render("pricing", { services });
});

// ===== ORDER SUBMIT =====
app.post("/order", async (req, res) => {
  const { name, email, service } = req.body;
  const price = services[service];

  // ===== EMAIL =====
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ADMIN_EMAIL,
      pass: "your-app-password" // gmail app password
    }
  });

  const mailOptions = {
    from: ADMIN_EMAIL,
    to: email,
    subject: "Order Invoice - Zeng Digital Services",
    html: `
      <h2>Thank you for your order</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Service:</b> ${service}</p>
      <p><b>Amount:</b> ₹${price}</p>
      <p>Status: Pending Payment</p>
    `
  };

  await transporter.sendMail(mailOptions);

  res.render("order-success", { name, service, price });
});

// ===== START =====
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});