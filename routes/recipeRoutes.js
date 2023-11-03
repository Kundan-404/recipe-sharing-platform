const express = require('express');
const router = express.Router();
const { isAuthenticated, validateInput } = require('../middleware/authMiddleware');
const { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

router.post('/', isAuthenticated, validateInput, createRecipe);
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', isAuthenticated, updateRecipe);
router.delete('/:id', isAuthenticated, deleteRecipe);

module.exports = router;
