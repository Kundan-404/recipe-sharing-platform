// server/controllers/authController.js
const passport = require('passport');
const {User} = require('../Models/recipe_models');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
};

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  const newUser = new User({ username, email, password, role });
  console.log(newUser);

  // newUser.save((err, user) => {
  //   if (err) return res.status(500).json({ message: err.message });
  //   res.json({ message: 'Signup successful', user });
  // });

  await newUser.save();
  res.json({ message: 'Signup successful', user: newUser });
};
