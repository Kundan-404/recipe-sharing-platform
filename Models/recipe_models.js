const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
  });

  userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    }
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


