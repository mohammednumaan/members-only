const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler')
const User = require('../models/users')

module.exports.status_get = asyncHandler(async (req, res,next) => {
  res.render('user_status_form', {
    user: req.user,
    role: req.params.role
  })
})

module.exports.status_post = [
    body('status').custom((value, {req}) => {
      if (req.params.role === 'member' && value !== 'm3mber') throw new Error('Invalid Code, Please Try Again!');
      if (req.params.role === 'admin' && value !== 'adm1n') throw new Error('Invalid Code, Please Try Again!');
      else return true;
    }).trim().escape(),

   asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
      res.render('user_status_form', {
        user: req.user,
        role: req.params.role,
        secretCode: req.body.secretCode,
        errors: errors.array()
      })
    }

    else{
      const user = await User.findById(req.user._id);
      const updatedUser = new User({
        fullname: req.user.fullname,
        username: req.user.username,
        status: req.params.role,
        salt: req.user.salt,
        hash: req.user.hash,
        _id: req.user._id
      });

      if (user === null){
        const error = new Error('User Not Found!');
        error.status = 404;
        return next(error);
      }

      await User.findByIdAndUpdate(req.user._id, updatedUser)
      res.redirect('/')

      
    }
  })
]
