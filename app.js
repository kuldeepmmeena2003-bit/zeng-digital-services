const express = require("express");
const path = require("path");

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====

// Home
app.get("/", (req, res) => res.render("home"));

// Main pages
app.get("/services", (req, res) => res.render("services"));
app.get("/pricing", (req, res) => res.render("pricing"));
app.get("/portfolio", (req, res) => res.render("portfolio"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/about", (req, res) => res.render("about"));

// Legal
app.get("/privacy", (req, res) => res.render("privacy"));
app.get("/terms", (req, res) => res.render("terms"));
app.get("/refund", (req, res) => res.render("refund"));
app.get("/policy", (req, res) => res.render("policy"));

// Order
app.get("/order", (req, res) => res.render("order"));
app.post("/order", (req, res) => res.render("order-success"));

// Payment
app.get("/payment", (req, res) => res.render("payment"));
app.get("/payment-success", (req, res) => res.render("payment-success"));

// Admin
app.get("/admin", (req, res) => res.render("admin-login"));
app.post("/admin-login", (req, res) => res.render("admin-dashboard"));
app.get("/admin/orders", (req, res) => res.render("admin-orders"));

// Service detail
app.get("/service/:name", (req, res) => {
  res.render("service-detail", { name: req.params.name });
});

// 404
app.use((req, res) => res.status(404).send("404 Not Found"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));