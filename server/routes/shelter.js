const express = require('express');
//const authController = require('../controllers/auth');
const shelterController = require('../controllers/shelter');

const router = express.Router();

router.get('/', shelterController.list, (req, res, next) => {
  res.locals.view = 'shelter/index';
  next();
});

router.get('/:slug', shelterController.one, (req, res, next) => {
  res.locals.view = 'shelter/details';
  next();
});

router.get('/submit', (req, res, next) => {
  res.locals.view = 'shelter/submit';
  next();
});

router.post('/submit', shelterController.submit, (req, res, next) => {
  res.redirect('/shelter/');
  next();
});

router.get('/:slug/edit', shelterController.one, (req, res, next) => {
  res.locals.view = 'shelter/submit';
  next();
});

router.post('/:slug/edit', shelterController.submit, (req, res, next) => {
  res.redirect(`/shelter/${req.params.slug}`);
  next();
});

module.exports = router;
