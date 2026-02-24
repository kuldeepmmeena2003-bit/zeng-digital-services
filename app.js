require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

/* ===============================
   🔧 MAINTENANCE MODE SWITCH
   true  = maintenance ON
   false = website normal
================================= */
const MAINTENANCE_MODE = false;  // 👈 ON karne ke liye true

/* ===============================
   VIEW ENGINE
================================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ===============================
   STATIC FILES
================================= */
app.use(express.static(path.join(__dirname, "public")));

/* ===============================
   MAINTENANCE CHECK
================================= */
app.use((req, res, next) => {
  if (MAINTENANCE_MODE) {
    return res.render("maintenance");
  }
  next();
});

/* ===============================
   ROUTES
================================= */
app.get("/", (req, res) => {
  res.render("home");
});

/* ===============================
   SERVER
================================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});