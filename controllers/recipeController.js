// server/controllers/recipeController.js
const {Recipe} = require('../models/recipe_models');

exports.createRecipe = (req, res) => {
  const { title, ingredients, steps, cuisineType, difficultyLevel } = req.body;

  const newRecipe = new Recipe({
    title,
    ingredients,
    steps,
    cuisineType,
    difficultyLevel,
    creator: req.user._id,
  });

  newRecipe.save((err, recipe) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Recipe created successfully', recipe });
  });
};

exports.getAllRecipes = (req, res) => {
  Recipe.find({}, (err, recipes) => {
    if (err) return res.status(500).json({ message: "no recipes" });
    res.json({ recipes });
  });
};

exports.updateRecipe = (req, res) => {
  const { title, ingredients, steps, cuisineType, difficultyLevel } = req.body;

  Recipe.findByIdAndUpdate(
    req.params.id,
    { title, ingredients, steps, cuisineType, difficultyLevel },
    { new: true },
    (err, recipe) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Recipe updated successfully', recipe });
    }
  );
};

exports.deleteRecipe = (req, res) => {
  Recipe.findByIdAndDelete(req.params.id, (err, recipe) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Recipe deleted successfully', recipe });
  });
};
