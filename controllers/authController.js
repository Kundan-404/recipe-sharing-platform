// server/controllers/authController.
const {User} = require('../Models/recipe_models');

exports.login = (req, res, next) => {
  console.log("Reached Here");
  res.json({ message: 'Login successful', user: req.user });
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
