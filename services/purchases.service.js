'use strict';
const db = require('../firebase-database').database();
const HelperService = require('./helper.service');

exports.getPurchases = async () => {
  try {
    const purchases = await db.ref(`purchases`).once('value');
    return purchases.val() ? HelperService.objectToArraySaveId(purchases.val()) : [];
  } catch (e) {
    throw Error('Could not fetch purchases');
  }
};

exports.addPurchases = async (purchasesItems) => {
  try {
    const purchasesToSave = [].concat(purchasesItems);
    purchasesToSave.forEach(async (purchase) => {
      await db.ref(`purchases`).push(purchase);
    });
    const purchases = await db.ref(`purchases`).once('value');
    if (purchases.val()) {
      return HelperService.objectToArraySaveId(purchases.val())
    }
    return [];
  } catch (e) {
    throw Error('Could not add purchases');
  }
};

exports.deletePurchases = async (id) => {
  try {
    await db.ref(`purchases/${id}`).set(null);
    const purchases = await db.ref(`purchases`).once('value');
    return purchases.val() ? HelperService.objectToArraySaveId(purchases.val()) : [];
  } catch (e) {
    throw Error('Could not delete purchase');
  }
};