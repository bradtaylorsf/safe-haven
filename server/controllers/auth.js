const passport = require('passport');
const User = require('../models/User');

const register = (accessToken, refreshToken, profile) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({ username: profile.username });
    User.register(newUser, accessToken, (err, user) => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};


const authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    req.login(user, (error) => {
      if (error) {
        next(error);
      } else {
        res.redirect('/profile');
      }
    });
  })(req, res);
};

const login = (req, res, next) => {
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
  authenticate,
  register,
  login,
  isLoggedIn,
  edit,
};
