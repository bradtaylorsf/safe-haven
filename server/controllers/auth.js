const User = require('../models/User');

const register = (req, res, next) => {
  User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
    if (err) {
      res.local.error = err;
      console.log('error while user register!', err);
      next();
    } else {
      req.login(user, (error) => {
        if (error) {
          res.local.error = error;
          next();
        } else {
          res.locals.user = user;
          next();
        }
      });
    }
  });
};

const edit = (req, res, next) => {
  // TODO: Add ability to edit a profile of a logged in user
  next();
};

const edit = (req, res, next) => {
  // TODO: Add ability to edit a profile of a logged in user
  next();
};


// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // if they aren't redirect them someplace to login
    res.redirect('/login');
  }
};

module.exports = {
  register,
  isLoggedIn,
  edit,
};
