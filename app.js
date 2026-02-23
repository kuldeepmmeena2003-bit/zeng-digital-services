require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// PAGES
app.get("/", (req, res) => res.render("home"));
app.get("/services", (req, res) => res.render("services"));
app.get("/pricing", (req, res) => res.render("pricing"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));

// ORDER ROUTE (FIX)
app.get("/order/:id", (req, res) => {
  const plans = {
    1: { name: "Starter Website", price: "4999" },
    2: { name: "Business Website", price: "9999" },
    3: { name: "SEO Package", price: "6999" }
  };

  const plan = plans[req.params.id];

  if (!plan) return res.send("Invalid plan");

  res.send(`
    <h1>${plan.name}</h1>
    <p>Price: ₹${plan.price}</p>
    <p>Payment integration coming next</p>
    <a href="/pricing">Back</a>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));