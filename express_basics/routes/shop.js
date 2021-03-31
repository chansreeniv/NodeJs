const path = require('path');

const express = require('express');

const shopController = require('../controller/shop');

const router = express.Router();

//get requests
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductDetail);

router.get('/cart', shopController.getShopCart);

router.get('/order', shopController.getShopOrders);

router.get('/checkout', shopController.getShopCheckout);

//post Requests
router.post('/cart', shopController.postShopCart);

router.post('/cart-delete-item', shopController.postShopCartDelete);


module.exports = router;
