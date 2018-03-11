'use strict';
const express = require('express');
const router = express.Router();

const FavoritesController = require('../../controllers/favorites.controller');

router.get('/', FavoritesController.getFavorites);
router.post('/', FavoritesController.addToFavorites);
router.delete('/:id', FavoritesController.removeFromFavorites);

module.exports = router;