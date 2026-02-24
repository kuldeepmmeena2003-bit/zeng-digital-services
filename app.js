const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

const services = [
  { name: "Logo Design", price: 999, slug: "logo", desc: "Professional brand logo" },
  { name: "Website Design", price: 4999, slug: "website", desc: "Business website design" },
  { name: "SEO Optimization", price: 2999, slug: "seo", desc: "Google ranking SEO" },
  { name: "Social Media Kit", price: 1999, slug: "social", desc: "Social media creatives" }
];

app.get("/", (req, res) => res.render("home", { services }));
app.get("/services", (req, res) => res.render("services", { services }));
app.get("/pricing", (req, res) => res.render("pricing", { services }));
app.get("/order", (req, res) => res.render("order", { services, selected: req.query.service }));
app.get("/success", (req, res) => res.render("success"));
app.get("/contact", (req, res) => res.render("contact"));

app.get("/privacy", (req, res) => res.render("privacy"));
app.get("/terms", (req, res) => res.render("terms"));
app.get("/refund", (req, res) => res.render("refund"));
app.get("/cancellation", (req, res) => res.render("cancellation"));

app.post("/create-order", (req, res) => {
  res.redirect("/success");
});

app.listen(3000, () => console.log("Server running"));