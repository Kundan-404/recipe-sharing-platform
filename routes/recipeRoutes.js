const express = require('express');
const router = express.Router();
const { validateInput } = require('../middleware/authMiddleware');
const { createRecipe, getAllRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const authenticateUser = require('../middleware/authMiddleware').authenticateUser;

router.post('/', authenticateUser, validateInput, createRecipe);
router.get('/', getAllRecipes);
// router.get('/:id', getRecipeById);
router.put('/:id', authenticateUser, updateRecipe);
router.delete('/:id', authenticateUser, deleteRecipe);

module.exports = router;
