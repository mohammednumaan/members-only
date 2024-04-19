const passport = require("passport");
const { body } = require("express-validator");

module.exports.login_get = (req, res, next) => res.render("login");
module.exports.login_post = [
  body("uname").trim().escape(),
  body("pass").trim().escape(),

  (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
      if (err) return next(err);
      if (!user) res.render("login", { error: info.message });
      req.login(user, next);
    })(req, res, next);
  },
  (req, res, next) => res.redirect("/dashboard"),
];
