// server/controllers/userController.js
const {User} = require('../Models/recipe_models');

exports.getUserProfile = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  });
};
