const express = require('express');
const path = require('path');

const app = express();

/* =============================
   BASIC CONFIG
============================= */

// Port (Render compatible)
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder (VERY IMPORTANT FOR CSS)
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* =============================
   MAINTENANCE MODE
   Set true if needed
============================= */
const maintenanceMode = false;

if (maintenanceMode) {
  app.use((req, res) => {
    return res.send(`
      <h1 style="text-align:center;margin-top:100px;font-family:sans-serif;">
        🚧 Website Under Maintenance<br>
        Please come back later.
      </h1>
    `);
  });
}

/* =============================
   ROUTES
============================= */

// Home
app.get('/', (req, res) => {
  res.render('home');
});

// Services
app.get('/services', (req, res) => {
  res.render('services');
});

// Pricing
app.get('/pricing', (req, res) => {
  res.render('pricing');
});

// Contact
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Order
app.get('/order', (req, res) => {
  res.render('order');
});

/* =============================
   CONTACT FORM POST (optional)
============================= */
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log("New Contact Form:");
  console.log(name, email, message);

  res.send(`
    <h2 style="text-align:center;margin-top:100px;">
      Thank you ${name}, we will contact you soon!
    </h2>
  `);
});

/* =============================
   404 PAGE
============================= */
app.use((req, res) => {
  res.status(404).send(`
    <h1 style="text-align:center;margin-top:100px;font-family:sans-serif;">
      404 - Page Not Found
    </h1>
  `);
});

/* =============================
   START SERVER
============================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});