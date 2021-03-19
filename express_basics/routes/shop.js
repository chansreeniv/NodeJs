const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('shop.js', adminData.product);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  const products = adminData.product;
  res.render('shop', {prods: products, pageTitle: 'Shop'});
});

module.exports = router;
