'use strict';
const CategoriesService = require('../services/categories.service');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoriesService.getCategories();
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};
