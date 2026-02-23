require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const app = express();

// ===== DATABASE =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ===== MIDDLEWARE =====
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// ===== SESSION =====
app.use(session({
  secret: process.env.SESSION_SECRET || "zengsecret",
  resave: false,
  saveUninitialized: false
}));

// ===== ROUTES =====
app.use("/", require("./routes/main"));
app.use("/order", require("./routes/order"));
app.use("/admin", require("./routes/admin"));

// ===== PORT =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});