const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.locals.view = 'home';
  res.locals.data = {
    title: 'Safe Haven Home',
    user: req.user || {},
  };
  next();
});

router.use('/auth', require('./auth'));

module.exports = router;
