const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
// const User = require("../models/user-model");
const { User } = require('../models/')
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  console.log("Serializing user now");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserializing user now");
  User.findOne({where:{id:id }}).then((user) => {
    console.log("Found user.");
    done(null, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(username, password);
    User.findOne({where:{ email: username }})
      .then(async (user) => {
        if (!user) {
          return done(null, false);
        }
         bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            return done(null, false);
          }
          if (!result) {
            return done(null, false);
          } else {
             return done(null, user);
          }
        });
      })
      .catch((err) => {
        return done(null, false);
      });
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: "72701935788-ua9f2h46th78vqb2347q8452d76kjuei.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ googleID: profile.id }).then((foundUser) => {
        if (foundUser) {
          console.log("User already exist");
          done(null, foundUser);
        } else {
           User.create({
          // new User({
            name: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
            email: profile.emails[0].value,
          }).then((newUser) => {
              console.log("New user created.");
              done(null, newUser);
            });
        }
      });
    }
  )
);
