'use strict';
const RecipesService = require('../services/recipes.service');

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await RecipesService.getRecipes();
    return res.status(200).json(recipes);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.getRecipe = async (req, res, next) => {
  const { id } = req.params;
  if (!id){
    return res.status(400).json({message: "Id must be present"});
  }
  try {
    const recipe = await RecipesService.getRecipe(id);
    return res.status(200).json(recipe);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.createRecipe = async (req, res, next) => {
  const { title, description, photoUrl, ingredients, instructions, categoryId } = req.body;
  const recipe = { title, description, photoUrl, ingredients, instructions, categoryId };

  try {
    const createdRecipeId = await RecipesService.createRecipe(recipe);
    return res.status(200).json(createdRecipeId);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.editRecipe = async (req, res, next) => {
  const { id, title, description, photoUrl, ingredients, instructions, categoryId } = req.body;
  if (!id){
    return res.status(400).json({message: "Id must be present"});
  }
  const recipe = { id, title, description, photoUrl, ingredients, instructions, categoryId };
  try {
    const editedRecipe = await RecipesService.editRecipe(recipe);
    return res.status(200).json(editedRecipe);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.deleteRecipe = async (req, res, next) => {
  const { id } = req.params;
  if (!id){
    return res.status(400).json({message: "Id must be present"});
  }
  try {
    const deletedRecipe = await RecipesService.deleteRecipe(id);
    return res.status(200).json(deletedRecipe);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.likeRecipe = async (req, res, next) => {
  const { id } = req.body;
  if (!id){
    return res.status(400).json({message: "Id must be present"});
  }
  try {
    const likedRecipe = await RecipesService.likeRecipe(id);
    return res.status(200).json(likedRecipe);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.dislikeRecipe = async (req, res, next) => {
  const { id } = req.body;
  if (!id){
    return res.status(400).json({message: "Id must be present"});
  }
  try {
    const dislikedRecipe = await RecipesService.dislikeRecipe(id);
    return res.status(200).json(dislikedRecipe);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await RecipesService.getCategories();
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};
