const express = require('express');
const { register_get, register_post } = require('../controllers/signupController');
const passport = require('passport');
const { dashboard_get } = require('../controllers/dashboardController');
const { message_get, message_post } = require('../controllers/messageController');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  (req.isAuthenticated()) ? res.redirect('/dashboard') : res.redirect('/login')
});

router.get('/register', register_get);
router.post('/register', register_post);

router.get('/login', (req, res, next) => res.render('login'));
router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/dashboard'}));

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/dashboard');
    });
});

router.get('/dashboard', dashboard_get);
router.get('/message', message_get), 
router.post('/message', message_post), 



module.exports = router;
