const express = require('express');
const { register_get, register_post } = require('../controllers/signupController');
const passport = require('passport');
const { dashboard_get } = require('../controllers/dashboardController');
const { status_get, status_post } = require('../controllers/statusController.js');
const messageController = require('../controllers/messageController.js')
const { login_get, login_post } = require('../controllers/loginController.js');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  (req.isAuthenticated()) ? res.redirect('/dashboard') : res.redirect('/login')
});

router.get('/register', register_get);
router.post('/register', register_post);

router.get('/login', login_get);
router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/dashboard'}));

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/dashboard');
    });
});

router.get('/dashboard', dashboard_get);

router.get('/dashboard/message/:id/delete', messageController.delete_get)
router.post('/dashboard/message/:id/delete', messageController.delete_post)

router.get('/message', messageController.message_get), 
router.post('/message', messageController.message_post), 

router.get('/status/:role', status_get)
router.post('/status/:role', status_post), 


module.exports = router;
