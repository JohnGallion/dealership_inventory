const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
// const User = require("../models/user-model");
const { User } = require('../models/');


router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.get("/signup", (req, res) => {
  res.render("signup", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "Wrong email or password.",
  }),
  (req, res) => {
    if (req.session.returnTo) {
      let newPath = req.session.returnTo;
      req.session.returnTo = "";
      res.redirect(newPath);
    } else {
      res.redirect("/profile");
                                                               
    }
  }
);

router.post("/signup", async (req, res) => {
  // console.log(req.body);
  let { name, email, password } = req.body;
  //check if the data is already in db
  const emailExist = await User.findOne({
    where:{email:email} });
  if (emailExist) {
    req.flash("error_ms", "Email has already been registered.");
    return res.redirect("/auth/signup");
  }

  const hash = await bcrypt.hash(password, 10);

  password = hash;
  // let newUser = new User({ name, email, password });
  await User.create({name:name,email:email,password:password})
  try {
    await newUser.save();
    req.flash("success_msg", "Registration succeeds. You can login now.");
    res.redirect("/auth/login");
  } catch (err) {
    // req.flash("error", err.errors.name.properties.message);
    res.redirect("/auth/signup");
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  if (req.session.returnTo) {
    let newPath = req.session.returnTo;
    req.session.returnTo = "";
    res.redirect(newPath);
  } else {
    res.redirect("/profile");    
  }});

module.exports = router;
