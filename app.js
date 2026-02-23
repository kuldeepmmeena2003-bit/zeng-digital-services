<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ===== DB (separate from old project) =====
mongoose.connect("mongodb+srv://zenguser:Kuldeep90@cluster0.prlszdx.mongodb.net/zengDigitalServices");

// ===== SETTINGS =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ===== ORDER MODEL =====
const Order = mongoose.model("Order", {
  service: String,
  price: Number,
  name: String,
  email: String,
  phone: String,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});

// ===== ROUTES =====

// HOME
app.get("/", (req, res) => {
  res.render("home");
});

// ABOUT
app.get("/about", (req, res) => {
  res.render("about");
});

// SERVICES
app.get("/services", (req, res) => {
  res.render("services");
});

// PRICING
app.get("/pricing", (req, res) => {
  res.render("pricing");
});

// CONTACT
app.get("/contact", (req, res) => {
  res.render("contact");
});

// POLICIES
app.get("/privacy", (req, res) => {
  res.render("privacy");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/refund", (req, res) => {
  res.render("refund");
});

app.get("/delivery", (req, res) => {
  res.render("delivery");
});

// ORDER PAGE
app.get("/order/:service/:price", (req, res) => {
  res.render("order", {
    service: req.params.service,
    price: req.params.price
  });
});

// PLACE ORDER
app.post("/place-order", async (req, res) => {
  const { service, price, name, email, phone } = req.body;

  await Order.create({
    service,
    price,
    name,
    email,
    phone
  });

  res.render("success", { service, price });
});

// ADMIN (optional)
app.get("/admin", async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.render("admin", { orders });
});

// ===== START =====
app.listen(3000, () => {
  console.log("✅ Zeng Digital Services running on http://localhost:3000");
=======
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ===== DB (separate from old project) =====
mongoose.connect("mongodb+srv://zenguser:Kuldeep90@cluster0.prlszdx.mongodb.net/zengDigitalServices");

// ===== SETTINGS =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ===== ORDER MODEL =====
const Order = mongoose.model("Order", {
  service: String,
  price: Number,
  name: String,
  email: String,
  phone: String,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});

// ===== ROUTES =====

// HOME
app.get("/", (req, res) => {
  res.render("home");
});

// ABOUT
app.get("/about", (req, res) => {
  res.render("about");
});

// SERVICES
app.get("/services", (req, res) => {
  res.render("services");
});

// PRICING
app.get("/pricing", (req, res) => {
  res.render("pricing");
});

// CONTACT
app.get("/contact", (req, res) => {
  res.render("contact");
});

// POLICIES
app.get("/privacy", (req, res) => {
  res.render("privacy");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/refund", (req, res) => {
  res.render("refund");
});

app.get("/delivery", (req, res) => {
  res.render("delivery");
});

// ORDER PAGE
app.get("/order/:service/:price", (req, res) => {
  res.render("order", {
    service: req.params.service,
    price: req.params.price
  });
});

// PLACE ORDER
app.post("/place-order", async (req, res) => {
  const { service, price, name, email, phone } = req.body;

  await Order.create({
    service,
    price,
    name,
    email,
    phone
  });

  res.render("success", { service, price });
});

// ADMIN (optional)
app.get("/admin", async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.render("admin", { orders });
});

// ===== START =====
app.listen(3000, () => {
  console.log("✅ Zeng Digital Services running on http://localhost:3000");
>>>>>>> 9fa772618de304641c7c55074f33abf96e62b2b4
});