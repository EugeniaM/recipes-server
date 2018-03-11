'use strict'
const express = require('express');
const router = express.Router();
const recipes = require('./api/recipes.route');
const categories = require('./api/categories.route');
const favorites = require('./api/favorites.route');
const purchases = require('./api/purchases.route');

router.use('/recipes', recipes);
router.use('/categories', categories);
router.use('/favorites', favorites);
router.use('/purchases', purchases);

module.exports = router;