// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const {
  createReview,
  getReviewsForRecipe
} = require('../controllers/reviewController');

// Create a new review for a recipe
router.post('/:recipeId', isAuthenticated, createReview);

// Get all reviews for a recipe
router.get('/:recipeId', getReviewsForRecipe);

module.exports = router;
