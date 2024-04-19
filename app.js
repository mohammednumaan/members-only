require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const mongoose = require('mongoose');
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main(){
  await mongoose.connect(mongoDB);
}

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

const sessionStore = MongoStore.create({mongoUrl: process.env.MONGO_URL, collectionName: 'sessions'})
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24}
}))

app.use(passport.session());
require('./passport/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());
app.use(helmet());
app.use(limiter)

app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
