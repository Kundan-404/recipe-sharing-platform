// server/controllers/reviewController.js
const {Review} = require('../Models/recipe_models');

exports.createReview = (req, res) => {
  const { text, rating } = req.body;

  const newReview = new Review({
    text,
    rating,
    user: req.user._id,
    recipe: req.params.recipeId,
  });

  newReview.save((err, review) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Review created successfully', review });
  });
};

exports.getReviewsForRecipe = (req, res) => {
  Review.find({ recipe: req.params.recipeId }, (err, reviews) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ reviews });
  });
};
