const path = require('path');

const express = require('express');

const router = express.Router();

const product = [];
const adminController = require('../controller/admin');

//Get requests
router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);

//post request
router.post('/add-product', adminController.postAddProduct);

module.exports = router;

// exports.routes = router;
// exports.product = product;
