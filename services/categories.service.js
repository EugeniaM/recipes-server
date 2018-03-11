'use strict';
const db = require('../firebase-database').database();
const HelperService = require('./helper.service');

exports.getCategories = async () => {
  try {
    const categories = await db.ref(`categories`).once('value');
    return HelperService.objectToArray(categories.val());
  } catch (e) {
    throw Error('Could not fetch categories');
  }
};