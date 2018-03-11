'use strict';
const express = require('express');
const router = express.Router();

const PurchasesController = require('../../controllers/purchases.controller');

router.get('/', PurchasesController.getPurchases);
router.post('/', PurchasesController.addPurchases);
router.delete('/:id', PurchasesController.deletePurchases);

module.exports = router;