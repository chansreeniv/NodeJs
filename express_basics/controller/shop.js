const Product = require("../models/products");



exports.getProducts = (req, res, next) => {
  // console.log('shop.js', adminData.product);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  Product.fetchAll((products) => {
    res.render("shop/product-list", { prods: products, pageTitle: "Shop" });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { prods: products, pageTitle: "Home" });
  });
};

exports.getShopProducts = (req, res) => {
  res.render('shop/products', {pageTitle: 'Products'});
}

exports.getShopCart = (req, res) => {
  res.render('shop/cart', {pageTitle: 'Cart'});
}

exports.getShopOrders = (req,res) => {
  res.render('shop/order', {pageTitle: 'Orders'});
}

exports.getShopCheckout = (req, res) => {
  res.render('shop/checkout', {pageTitle: 'Checkout'});
}

exports.getAdminProducts = (req, res) => {
  res.render('admin/products', {pageTitle: 'Admin Products'});
}
