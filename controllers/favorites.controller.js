'use strict';
const FavoritesService = require('../services/favorites.service');

exports.addToFavorites = async (req, res, next) => {
  const { id } = req.body;
  if (!id){
    return res.status(400).json({message: "Id must be present"});
  }

  try {
    await FavoritesService.addToFavorites(id);
    return res.status(200).json(id);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.removeFromFavorites = async (req, res, next) => {
  const { id } = req.params;
  if (!id){
    return res.status(400).json({message: "Id must be present"});
  }

  try {
    await FavoritesService.removeFromFavorites(id);
    return res.status(200).json(id);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await FavoritesService.getFavorites();
    return res.status(200).json(favorites);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};
