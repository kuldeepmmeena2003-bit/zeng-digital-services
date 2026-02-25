const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

// ✅ YOUR MAILER (utils folder)
const { sendOrderEmail, sendPaymentEmail } = require("./utils/mailer");

const app = express();
const PORT = 3000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "zengsecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ---------------- SERVICES ---------------- */
const services = [
  { name: "Website Development", price: 1499 },
  { name: "SEO Optimization", price: 999 },
  { name: "Logo Design", price: 499 },
  { name: "Social Media Marketing", price: 1299 },
  { name: "Google Ads Setup", price: 1999 },
  { name: "Website Maintenance", price: 799 },
];

/* ---------------- MEMORY ORDERS ---------------- */
let orders = [];

/* ---------------- ADMIN AUTH ---------------- */
function checkAdmin(req, res, next) {
  if (req.session.admin) return next();
  res.redirect("/admin/login");
}

/* ---------------- HOME ---------------- */
app.get("/", (req, res) => {
  res.render("home", { services });
});

/* ---------------- ORDER PAGE ---------------- */
app.get("/order", (req, res) => {
  res.render("order", { services });
});

/* ---------------- CREATE ORDER ---------------- */
app.post("/create-order", async (req, res) => {
  const { service, amount, name, email, phone } = req.body;

  const order = {
    orderId: Date.now().toString(),
    service,
    amount,
    name,
    email,
    phone,
    utr: null,
    status: "Pending",
  };

  orders.push(order);

  // ✅ ORDER EMAIL
  try {
    await sendOrderEmail(
      order.email,
      order.orderId,
      order.service,
      order.amount
    );
  } catch (err) {
    console.error("Order email error:", err);
  }

  // 👉 show QR payment page
  res.render("payment", { order });
});

/* ---------------- SUBMIT UTR ---------------- */
app.post("/submit-utr", (req, res) => {
  const { orderId, utr } = req.body;

  const order = orders.find((o) => o.orderId == orderId);

  if (order) {
    order.utr = utr;
    order.status = "Verification Pending";
  }

  res.render("payment-pending", { order });
});

/* ---------------- ADMIN LOGIN ---------------- */
app.get("/admin/login", (req, res) => {
  res.render("admin-login");
});

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  // 👉 apna id/pass yaha set karo
  if (username === "admin" && password === "1234") {
    req.session.admin = true;
    return res.redirect("/admin/orders");
  }

  res.send("Invalid admin credentials");
});

/* ---------------- ADMIN LOGOUT ---------------- */
app.get("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
});

/* ---------------- ADMIN ORDERS ---------------- */
app.get("/admin/orders", checkAdmin, (req, res) => {
  res.render("orders", { orders });
});

/* ---------------- VERIFY PAYMENT ---------------- */
app.post("/admin/verify/:orderId", checkAdmin, async (req, res) => {
  const order = orders.find((o) => o.orderId == req.params.orderId);

  if (order) {
    order.status = "Paid";

    // ✅ PAYMENT VERIFIED EMAIL
    try {
      await sendPaymentEmail(order.email, order.orderId);
    } catch (err) {
      console.error("Payment email error:", err);
    }
  }

  res.redirect("/admin/orders");
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});