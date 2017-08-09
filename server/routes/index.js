const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.locals.view = 'home';
  res.locals.data = {
    title: 'Safe Haven Home',
    user: req.user || {},
  };
  next();
});

router.get('/profile', authController.isLoggedIn, (req, res, next) => {
  res.locals.view = 'auth/profile';
  res.locals.user = req.user || false;
  next();
});

router.get('/login', (req, res, next) => {
  res.locals.view = 'auth/login';
  next();
});

router.post('/login', authController.login, (req, res, next) => {
  res.redirect('/profile');
  next();
});

router.get('/register', (req, res, next) => {
  res.locals.view = 'auth/register';
  next();
});

router.post('/register', authController.register, (req, res, next) => {
  res.redirect('/profile');
  next();
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use('/shelter', require('./shelter'));

module.exports = router;
