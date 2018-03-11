'use strict';
const db = require('../firebase-database').database();

exports.objectToArray = (obj) => {
  const arr = [];
  for(let key in obj) {
    arr.push(obj[key]);
  }
  return arr;
};

exports.objectToArraySaveId = (obj) => {
  const arr = [];
  for(let key in obj) {
    arr.push({
      id: key,
      purchase: obj[key]
    });
  }
  return arr;
};

const asyncForEach = async function(array, cb) {
  for (let index = 0; index < array.length; index++) {
    await cb(array[index], index, array);
  }
};

exports.saveIngredients = async (ingredients, id) => {
  try {
    await asyncForEach(ingredients, async(ingredient) => {
      try {
        const key = db.ref(`recipes/${id}/ingredients`).push().key;
        await db.ref(`recipes/${id}/ingredients/${key}`).set(ingredient);
      } catch (e) {
        throw Error('Could not save ingredients');
      }
    })
  } catch (e) {
    throw Error('Could not save ingredients');
  }
};