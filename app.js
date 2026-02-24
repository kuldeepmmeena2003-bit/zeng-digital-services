const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// ===== VIEW ENGINE =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== STATIC FILES (CSS FIX) =====
app.use(express.static(path.join(__dirname, "public")));

// ===== BODY PARSER =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ===== SESSION =====
app.use(
  session({
    secret: "zengsecret",
    resave: false,
    saveUninitialized: true,
  })
);

// ===== MAINTENANCE MODE =====
const maintenanceMode = false;

app.use((req, res, next) => {
  if (maintenanceMode) {
    return res.render("maintenance");
  }
  next();
});

// ===== EXISTING ROUTES SAFE LOAD =====
try {
  const authRoutes = require("./routes/auth");
  app.use("/auth", authRoutes);
} catch (e) {}

try {
  const paymentRoutes = require("./routes/payment");
  app.use("/payment", paymentRoutes);
} catch (e) {}

try {
  const dashboardRoutes = require("./routes/dashboard");
  app.use("/dashboard", dashboardRoutes);
} catch (e) {}

try {
  const orderRoutes = require("./routes/order");
  app.use("/order", orderRoutes);
} catch (e) {}

// ===== AGENCY PAGES =====
app.get("/", (req, res) => res.render("home"));
app.get("/services", (req, res) => res.render("services"));
app.get("/portfolio", (req, res) => res.render("portfolio"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));

// ===== CONTACT FORM =====
app.post("/contact", (req, res) => {
  console.log("Contact:", req.body);
  res.redirect("/contact");
});

// ===== LEGAL =====
app.get("/privacy", (req, res) => res.render("privacy"));
app.get("/terms", (req, res) => res.render("terms"));

// ===== SERVER =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Zeng Digital Services running on port " + PORT);
});