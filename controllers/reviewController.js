// server/controllers/reviewController.js
const {Review} = require('../Models/recipe_models');

exports.createReview = async(req, res) => {
  const { comment, rating , user, recipe} = req.body;

  const newReview = new Review({
    comment,
    rating,
    user: user,
    recipe: recipe,
  });

  // newReview.save((err, review) => {
  //   if (err) return res.status(500).json({ message: err.message });
  //   res.json({ message: 'Review created successfully', review });
  // });
  await newReview.save();
  res.json({ message: 'Review created successfully', review: newReview });
};

exports.getReviewsForRecipe = (req, res) => {
  Review.find({ recipe: req.params.recipeId }, (err, reviews) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ reviews });
  });
};
