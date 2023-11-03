const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
  });

  const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    ingredients: [String],
    steps: [String],
    cuisineType: String,
    difficultyLevel: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: Date,
    updatedAt: Date,
  });

  const reviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: Date,
    updatedAt: Date,
  });

  const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    // Add other category-related fields as needed
  });

  module.exports = {
    User : mongoose.model('User', userSchema),
    Recipe : mongoose.model('Recipe', recipeSchema),
    Review : mongoose.model('Review', reviewSchema),
    Category: mongoose.model('Category', categorySchema)
  }


