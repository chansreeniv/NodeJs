const path = require('path');

const express = require('express');

const router = express.Router();

const product = [];
const adminController = require('../controller/admin');

//Get requests
router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);
router.get('/edit-product/:productId', adminController.getEditProduct);

//post request
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;

// exports.routes = router;
// exports.product = product;
