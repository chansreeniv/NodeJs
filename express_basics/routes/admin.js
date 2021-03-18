const path = require('path');

const express = require('express');

const router = express.Router();

const product = [];

const rootDir = require('../util/path');

router.get('/add-product',(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) =>{
    // console.log(req.body);
    product.push({title: req.body.title});
    res.redirect('/');
})

// module.exports = router;

exports.routes = router;
exports.product = product;
