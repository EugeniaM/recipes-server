'use strict';
const db = require('../firebase-database').database();
const HelperService = require('./helper.service');

exports.getRecipes = async () => {
  try {
    const recipes = await db.ref(`recipes`).once('value');
    const favorites = await db.ref('favorites').once('value');
    const recipesArr = HelperService.objectToArray(recipes.val());
    recipesArr.forEach(recipe => {
      recipe.ingredients = HelperService.objectToArray(recipe.ingredients);
      if (favorites.val()) {
        recipe.isFavorite = Object.keys(favorites.val()).includes(recipe.id);
      }
    });
    return recipesArr;
  } catch (e) {
    throw Error('Could not fetch recipes');
  }
};

exports.getRecipe = async (id) => {
  try {
    const recipe = await db.ref(`recipes/${id}`).once('value');
    const favorites = await db.ref('favorites').once('value');
    if (!recipe.val()) throw Error('Could not fetch recipe');
    const selectedRecipe = recipe.val();
    const category = await db.ref(`categories/${selectedRecipe.categoryId}`).once('value');
    selectedRecipe.category = category.val().name;
    selectedRecipe.ingredients = HelperService.objectToArray(selectedRecipe.ingredients);
    if (favorites.val()) {
      selectedRecipe.isFavorite = Object.keys(favorites.val()).includes(selectedRecipe.id);
    }
    return selectedRecipe;
  } catch (e) {
    throw Error('Could not fetch recipe');
  }
};

exports.createRecipe = async (recipe) => {
  const { title, description, photoUrl, ingredients, instructions, categoryId } = recipe;
  try {
    const id = db.ref('recipes').push().key;
    const createdRecipe = await db.ref(`recipes/${id}`).set({
      id, title, description, photoUrl, instructions, categoryId, likes: 0
    });
    HelperService.saveIngredients(ingredients, id);
    return id;
  } catch (e) {
    throw Error('Could not create recipe');
  }
};

exports.editRecipe = async (recipe) => {
  const { id, title, description, photoUrl, ingredients, instructions, categoryId } = recipe;
  try {
    const selectedRecipe = await db.ref(`recipes/${id}`).once('value');
    if (!selectedRecipe.val()) throw Error('Recipe does not exist');
    const likes = selectedRecipe.val().likes;
    const editedRecipe = await db.ref(`recipes/${id}`).set({
      id, title, description, photoUrl, instructions, categoryId, likes: 0
    });
    HelperService.saveIngredients(ingredients, id);
    return editedRecipe;
  } catch (e) {
    throw Error('Could not edit recipe');
  }
};

exports.deleteRecipe = async (id) => {
  try {
    const selectedRecipe = await db.ref(`recipes/${id}`).once('value');
    if (!selectedRecipe.val()) throw Error('Recipe does not exist');
    try {
      return await db.ref(`recipes/${id}`).set(null);
    } catch (e) {
      throw Error('Could not delete recipe');
    }
  } catch (e) {
    throw Error('Recipe does not exist');
  }
};

exports.likeRecipe = async (id) => {
  try {
    const selectedRecipe = await db.ref(`recipes/${id}`).once('value');
    if (!selectedRecipe.val()) throw Error('Recipe does not exist');
    try {
      await db.ref(`recipes/${id}`).update({likes: ++selectedRecipe.val().likes});
      return await db.ref(`recipes/${id}`).once('value');
    } catch (e) {
      throw Error('Could not update recipe');
    }
  } catch (e) {
    throw Error('Recipe does not exist');
  }
};

exports.dislikeRecipe = async (id) => {
  try {
    const selectedRecipe = await db.ref(`recipes/${id}`).once('value');
    if (!selectedRecipe.val()) throw Error('Recipe does not exist');
    try {
      await db.ref(`recipes/${id}`).update({likes: --selectedRecipe.val().likes});
      return await db.ref(`recipes/${id}`).once('value');
    } catch (e) {
      throw Error('Could not update recipe');
    }
  } catch (e) {
    throw Error('Recipe does not exist');
  }
};

exports.getCategories = async () => {
  try {
    const categories = await db.ref(`categories`).once('value');
    const categoriesArr = HelperService.objectToArray(categories.val());
    return categoriesArr;
  } catch (e) {
    throw Error('Could not fetch categories');
  }
};