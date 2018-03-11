'use strict';
const db = require('../firebase-database').database();
const HelperService = require('./helper.service');

exports.addToFavorites = async (id) => {
  try {
    await db.ref(`favorites/${id}`).set(true);
    return id;
  } catch (e) {
    throw Error('Could not add to favorites');
  }
};

exports.removeFromFavorites = async (id) => {
  try {
    await db.ref(`favorites/${id}`).set(null);
    return id;
  } catch (e) {
    throw Error('Could not remove from favorites');
  }
};

exports.getFavorites = async () => {
  try {
    const favorites = await db.ref('favorites').once('value');
    if (!favorites) return [];

    const recipes = await db.ref(`recipes`).once('value');
    let favoritesRecipes = [];
    for (let key in favorites.val()) {
      if (recipes.val()[key]) favoritesRecipes.push(recipes.val()[key]);
    }
    favoritesRecipes.forEach(recipe => {
      recipe.ingredients = HelperService.objectToArray(recipe.ingredients);
    });
    return favoritesRecipes;
  } catch  (e) {
    throw Error('Could not fetch favorites');
  }
};
