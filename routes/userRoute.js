// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
// const { isAuthenticated } = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');
const tokenVerification = require('../middleware/authMiddleware').tokenVerification;

// Get user profile
router.get('/userId', tokenVerification, getUserProfile);
module.exports = router;
