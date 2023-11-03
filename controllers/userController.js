// server/controllers/userController.js
const {User} = require('../Models/recipe_models');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.body.user; // Assuming the user ID is passed in the URL params
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { _id, username, email, role } = userProfile; // Extract specific fields if needed

    res.json({ _id, username, email, role }); // Send the user profile data
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
