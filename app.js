const express = require("express");
const path = require("path");

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ===== MAIN ROUTES =====
app.get("/", (req, res) => res.render("home"));
app.get("/pricing", (req, res) => res.render("pricing"));
app.get("/services", (req, res) => res.render("services"));
app.get("/service/:id", (req, res) => res.render("service-detail"));
app.get("/portfolio", (req, res) => res.render("portfolio"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));

// ===== ORDER =====
app.get("/order", (req, res) => res.render("order"));
app.post("/order", (req, res) => res.render("order-success"));

// ===== PAYMENT =====
app.get("/payment", (req, res) => res.render("payment"));
app.get("/payment-success", (req, res) => res.render("payment-success"));

// ===== LEGAL =====
app.get("/privacy", (req, res) => res.render("privacy"));
app.get("/terms", (req, res) => res.render("terms"));
app.get("/refund", (req, res) => res.render("refund"));
app.get("/policy", (req, res) => res.render("policy"));

// ===== ADMIN =====
app.get("/admin", (req, res) => res.render("admin-login"));
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    res.redirect("/admin-dashboard");
  } else {
    res.send("Invalid admin login");
  }
});

app.get("/admin-dashboard", (req, res) =>
  res.render("admin-dashboard")
);
app.get("/admin-orders", (req, res) =>
  res.render("admin-orders")
);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));