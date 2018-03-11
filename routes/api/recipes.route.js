'use strict';
const express = require('express');
const router = express.Router();

const RecipesController = require('../../controllers/recipes.controller');

router.get('/', RecipesController.getRecipes);
router.get('/:id', RecipesController.getRecipe);
router.post('/', RecipesController.createRecipe);
router.put('/', RecipesController.editRecipe);
router.delete('/:id', RecipesController.deleteRecipe);
router.post('/likes', RecipesController.likeRecipe);
router.post('/dislikes', RecipesController.dislikeRecipe);
router.get('/categories', RecipesController.getCategories);

module.exports = router;