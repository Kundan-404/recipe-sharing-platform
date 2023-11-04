const express = require('express');
const router = express.Router();
const { validateInput } = require('../middleware/authMiddleware');
const { createRecipe, getAllRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const {tokenVerification} = require('../middleware/authMiddleware');

router.post('/', tokenVerification, createRecipe);

router.get('/', getAllRecipes);
// router.get('/:id', getRecipeById);
router.put('/:id', tokenVerification, updateRecipe);
router.delete('/:id', tokenVerification, deleteRecipe);

module.exports = router;
