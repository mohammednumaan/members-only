const passport = require('passport');
const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler')

module.exports.login_get = (req, res, next) => res.render('login')
module.exports.login_post = [
  body('uname').trim().escape(),
  body('pass').trim().escape(),

  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        res.render('login', {
            uname: req.body.uname,
            pass: req.body.pass,
            errors: errors.array()
        })
    }

    else{
      passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/dashboard'})
    }

  })
]
