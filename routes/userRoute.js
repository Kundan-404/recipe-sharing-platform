// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');

// Get user profile
router.get('/:userId', isAuthenticated, getUserProfile);

module.exports = router;
