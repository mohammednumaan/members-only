const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const { genPassword } = require("../passport/passwordUtils");

module.exports.signup_get = (req, res, next) => res.render("signup");

module.exports.signup_post = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last Name Must Be Atleast 3 Characters!")
    .escape(),
  body("uname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username Must Be Atleast 3 Characters!")
    .escape(),
  body("pass")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password Must Be Atleast 8 Characters!")
    .escape(),
  body("cpass")
    .custom((value, { req }) => {
      if (value !== req.body.pass) throw new Error("Passwords Must Match!");
      else return true;
    })
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const saltHash = genPassword(req.body.pass);

    const user = new User({
      fullname: req.body.name,
      username: req.body.uname,
      salt: saltHash.salt,
      hash: saltHash.hash,
    });

    if (!errors.isEmpty()) {
      res.render("signup", {
        name: user.name,
        uname: user.username,
        pass: req.body.pass,
        cpass: req.body.cpass,
        errors: errors.array(),
      });
    } else {
      try {
        await user.save();
        res.redirect("/login");
      } catch (err) {
        return next(err);
      }
    }
  }),
];
