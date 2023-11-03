// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
// const { isAuthenticated } = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware').authenticateUser;

// Get user profile
router.get('/:userId', authenticateUser, getUserProfile);

module.exports = router;
