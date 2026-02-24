const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ===== CONFIG =====
const SITE_NAME = "Zeng Digital Services";
const ADMIN_EMAIL = "yourgmail@gmail.com";

// ===== SERVICE PRICES =====
const services = {
  "Instagram Followers": 499,
  "Instagram Likes": 299,
  "YouTube Views": 399,
  "YouTube Subscribers": 799,
  "Website Development": 4999,
  "SEO Optimization": 2999
};

// ===== ORDER DB =====
const DB_FILE = "orders.json";
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]");

function readOrders() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveOrder(order) {
  const orders = readOrders();
  orders.push(order);
  fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2));
}

// ===== HOME =====
app.get("/", (req, res) => res.render("index"));

// ===== PRICING =====
app.get("/pricing", (req, res) => {
  res.render("pricing", { services });
});

// ===== CONTACT =====
app.get("/contact", (req, res) => res.render("contact"));

// ===== POLICY =====
app.get("/policy", (req, res) => res.render("policy"));

// ===== ORDER CREATE =====
app.post("/order", (req, res) => {
  const { name, email, service } = req.body;
  const price = services[service];
  const orderId = "ORD" + Date.now();

  const order = {
    orderId,
    name,
    email,
    service,
    price,
    status: "PENDING"
  };

  saveOrder(order);

  res.render("order-success", { order });
});

// ===== CASHFREE WEBHOOK =====
app.post("/cashfree/webhook", (req, res) => {
  const { orderId, status } = req.body;

  const orders = readOrders();
  const order = orders.find(o => o.orderId === orderId);

  if (order) {
    order.status = status;
    fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2));
  }

  res.sendStatus(200);
});

// ===== ADMIN PANEL =====
app.get("/admin/orders", (req, res) => {
  const orders = readOrders();
  res.render("admin-orders", { orders });
});

// ===== INVOICE PDF =====
app.get("/invoice/:id", (req, res) => {
  const orders = readOrders();
  const order = orders.find(o => o.orderId === req.params.id);

  if (!order) return res.send("Not found");

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");

  doc.text("Zeng Digital Services");
  doc.text("Invoice");
  doc.text("Order: " + order.orderId);
  doc.text("Name: " + order.name);
  doc.text("Service: " + order.service);
  doc.text("Amount: ₹" + order.price);
  doc.text("Status: " + order.status);

  doc.pipe(res);
  doc.end();
});

// ===== START =====
app.listen(PORT, () => console.log("Server running " + PORT));