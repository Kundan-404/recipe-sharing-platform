// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
// const passport = require('passport');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { login, logout, signup } = require('../controllers/authController');

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', isAuthenticated, logout);

// Signup route
router.post('/signup', signup);

module.exports = router;

