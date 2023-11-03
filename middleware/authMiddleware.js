// server/middleware/authMiddleware.js
const passport = require('passport');

exports.isAuthenticated = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.login(user, (err) => {
      if (err) return next(err);
      return next();
    });
  })(req, res, next);
};
