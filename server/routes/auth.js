const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/profile', authController.isLoggedIn, (req, res, next) => {
  res.locals.layout = 'wrapper';
  res.locals.view = 'profiles/detail';
  res.locals.bodyClass = 'courses landing';
  res.locals.footerClass = 'footer-grey';
  res.locals.data = {
    title: 'Profile',
    user: req.user || {},
  };
  next();
});

// Link to Authorize Optimizely
router.get('/optimizely', authController.authenticate);

// URL that the user is returned to to after authorizing the app
router.get('/optimizely/callback', authController.authenticate);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/academy?action=logout');
});

module.exports = router;
