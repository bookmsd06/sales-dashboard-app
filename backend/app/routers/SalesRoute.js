const express = require('express');
const SalesController = require('../controllers/SalesController');

const router = express.Router();

router.get('/saleAndRevenue', SalesController.getSaleAndRevenue);
router.get('/filter', SalesController.filterSales);
router.get('/trend', SalesController.getSalesTrend);

module.exports = router;
