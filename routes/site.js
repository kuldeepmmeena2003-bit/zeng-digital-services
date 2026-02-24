const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>res.render("home"));
router.get("/services",(req,res)=>res.render("services"));
router.get("/portfolio",(req,res)=>res.render("portfolio"));
router.get("/about",(req,res)=>res.render("about"));
router.get("/contact",(req,res)=>res.render("contact"));

router.post("/contact",(req,res)=>{
  console.log(req.body);
  res.redirect("/contact");
});

module.exports = router;