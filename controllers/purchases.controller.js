'use strict';
const PurchasesService = require('../services/purchases.service');

exports.getPurchases = async (req, res, next) => {
  try {
    const purchases = await PurchasesService.getPurchases();
    return res.status(200).json(purchases);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.addPurchases = async (req, res, next) => {
  const { purchases } = req.body;
  try {
    const purchasesList = await PurchasesService.addPurchases(purchases);
    return res.status(200).json(purchasesList);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};

exports.deletePurchases = async (req, res, next) => {
  const { id } = req.params;
  if (!id){
    return res.status(400).json({message: "Id must be present"});
  }
  try {
    const purchases = await PurchasesService.deletePurchases(id);
    return res.status(200).json(purchases);
  } catch (e) {
    return res.status(404).json({message: e.message});
  }
};