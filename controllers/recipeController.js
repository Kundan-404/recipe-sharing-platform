// server/controllers/recipeController.js
const { json } = require('express');
const {Recipe} = require('../Models/recipe_models');

exports.createRecipe = async(req, res) => {
  console.log("create recipe");
  const { title, ingredients, steps, cuisineType, difficultyLevel } = req.body;

  const newRecipe = new Recipe({
    title,
    ingredients,
    steps,
    cuisineType,
    difficultyLevel,
    creator: req.body.creator,
  });

  // await newRecipe.save((err, recipe) => {
  //   if (err) return res.status(500).json({ message: err.message });
  //   res.json({ message: 'Recipe created successfully', recipe });
  // });

  await newRecipe.save();
  res.json({ message: 'Recipe created successfully', recipe: newRecipe });
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('createdBy').exec();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  const { id } = req.params; // Assuming the ID is passed in the URL params

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.deleteRecipe = (req, res) => {
  Recipe.findByIdAndDelete(req.params.id, (err, recipe) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Recipe deleted successfully', recipe });
  });
};
