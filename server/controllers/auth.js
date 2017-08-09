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
  passport.authenticate('optimizely', (err, user) => {
    debugger;
    req.login(user, (error) => {
      if (error) {
        next(error);
      } else {
        res.redirect('/academy/auth/profile');
      }
    });
  })(req, res);
};

const oauth = (accessToken, refreshToken, profile, done) => {
  // Find a user by the username
  debugger;
  User.findByUsername(profile.username, (err, existingUser) => {
    if (err) {
      done(err);
    }

    // If the user does not exists, create a profile for the user
    if (!existingUser) {
      // Register a new User
      register(accessToken, refreshToken, profile)
      .then((newUser) => {
        done(null, newUser);
      }).catch((error) => {
        done(error);
      });
    } else {
      // User exists so log that user in
      done(null, existingUser);
    }
  });
};

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // if they aren't redirect them someplace to login
    res.redirect('/academy');
  }
};

module.exports = {
  authenticate,
  oauth,
  isLoggedIn,
};
