// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
// const passport = require('passport');
// const { isAuthenticated } = require('../middleware/authMiddleware');
const { login, logout, signup } = require('../controllers/authController');
const {authenticateUser, tokenVerification} = require('../middleware/authMiddleware');

// Login route

router.post('/login', authenticateUser, login);

// Logout route
router.get('/logout', tokenVerification, logout);

// Signup route
router.post('/signup', signup);

module.exports = router;

