const path = require('path');

const express = require('express');

const shopController = require('../controller/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getShopCart);

router.get('/order', shopController.getShopOrders);

router.get('/checkout', shopController.getShopCheckout);

module.exports = router;
