const passport = require("passport");
const Users = require("../models/users");
const { verifyPassword } = require("./passwordUtils");
const LocalStrategy = require("passport-local").Strategy;

const customFields = {
  usernameField: "uname",
  passwordField: "pass",
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await Users.findOne({ username: username });
    if (!user)
      return done(null, false, { message: "Invalid Username Or Password." });

    const isValidPassword = verifyPassword(password, user.hash, user.salt);
    return isValidPassword
      ? done(null, user)
      : done(null, false, { message: "Invalid Username Or Password." });
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await Users.findById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
