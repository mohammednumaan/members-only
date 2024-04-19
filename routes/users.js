const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController.js');

router.get('/signup', signupController.signup_get);
router.post('/signup', signupController.signup_post);

router.get('/login', loginController.login_get);
router.post('/login', loginController.login_post);

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/dashboard');
    });
});


module.exports = router;
