const router = require("express").Router();
// const Post = require("../models/post-model");
const { Sequelize, Model, DataTypes } = require("sequelize");
const {post} = require("../models");

const authCheck = (req, res, next) => {
  console.log(req.originalUrl);
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};


router.get("/", authCheck, async (req, res) => {
  console.log(req.user)
  let postFound = await post.findAll({where:{ author: req.user.dataValues.id }});
  console.log(postFound)
  res.render("profile", { user: req.user, posts: postFound });
});

router.get("/post", authCheck, (req, res) => {
  res.render("post", { user: req.user });
});

router.post("/post", authCheck, async (req, res) => {
  let { make,type,year,price } = req.body;
  // await post.create({title:title,content:content,author: req.user.id})
  await post.create({make:make,type:type,year:year,price:price,author: req.user.id})
  try {
    // await newPost.save();
    res.status(200).redirect("/profile");
  } catch (err) {
    req.flash("error_msg", "Both title and content are required.");
    res.redirect("/profile/post");
  }
});

router.post("/delete/:id", authCheck, async (req, res) => {

  await post.destroy({
    where: {
      id: req.params.id
    }
  });
res.redirect("/")

})
  
module.exports = router;
