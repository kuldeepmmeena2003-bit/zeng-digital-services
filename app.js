const express = require("express");
const path = require("path");

const app = express();

/* ========= SETTINGS ========= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ========= MIDDLEWARE ========= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ========= MAINTENANCE MODE ========= */
const MAINTENANCE_MODE = false;

app.use((req, res, next) => {
  if (MAINTENANCE_MODE) {
    return res.render("maintenance", { title: "Maintenance" });
  }
  next();
});

/* ========= ROUTES ========= */
const pagesRoutes = require("./routes/pages");
app.use("/", pagesRoutes);

const orderRoutes = require("./routes/order");
app.use("/", orderRoutes);

/* ========= BASIC PAGES ========= */
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/pricing", (req, res) => {
  res.render("pricing", { title: "Pricing" });
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio", { title: "Portfolio" });
});

/* ========= CASHFREE CHECKOUT ========= */
app.post("/checkout", (req, res) => {
  const { name, email, service, amount } = req.body;

  /* Cashfree Payment Link */
  const paymentLink =
    "https://payments.cashfree.com/forms/YOUR_LINK";

  res.redirect(paymentLink);
});

/* ========= SERVER ========= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});