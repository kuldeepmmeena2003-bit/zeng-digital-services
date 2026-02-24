const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== VIEW ENGINE =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== MIDDLEWARE =====
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "zengadmin",
  resave: false,
  saveUninitialized: true
}));

// ===== CONFIG =====
const ADMIN_USER = "admin";
const ADMIN_PASS = "zeng123";

// ===== SERVICES =====
const services = {
  "Instagram Followers": 499,
  "Instagram Likes": 299,
  "YouTube Views": 399,
  "YouTube Subscribers": 799,
  "Website Development": 4999,
  "SEO Optimization": 2999
};

// ===== DB =====
const DB_FILE = "orders.json";
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]");

function readOrders() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeOrders(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function saveOrder(order) {
  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);
}

// ===== ADMIN AUTH =====
function requireAdmin(req, res, next) {
  if (req.session.admin) return next();
  res.redirect("/admin/login");
}

// ===== HOME =====
app.get("/", (req, res) => res.render("index"));

// ===== PRICING =====
app.get("/pricing", (req, res) => res.render("pricing", { services }));

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

// ===== ADMIN ROOT =====
app.get("/admin", (req, res) => {
  if (req.session.admin) {
    return res.redirect("/admin/dashboard");
  }
  res.redirect("/admin/login");
});

// ===== ADMIN LOGIN =====
app.get("/admin/login", (req, res) => res.render("admin-login"));

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.admin = true;
    return res.redirect("/admin/dashboard");
  }

  res.render("admin-login", { error: "Invalid login" });
});

// ===== ADMIN DASHBOARD =====
app.get("/admin/dashboard", requireAdmin, (req, res) => {
  const orders = readOrders();
  res.render("admin-dashboard", { count: orders.length });
});

// ===== ADMIN ORDERS =====
app.get("/admin/orders", requireAdmin, (req, res) => {
  const orders = readOrders();
  res.render("admin-orders", { orders });
});

// ===== ADMIN UPDATE STATUS =====
app.post("/admin/update-status", requireAdmin, (req, res) => {
  const { orderId, status } = req.body;
  const orders = readOrders();

  const order = orders.find(o => o.orderId === orderId);
  if (order) order.status = status;

  writeOrders(orders);
  res.redirect("/admin/orders");
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