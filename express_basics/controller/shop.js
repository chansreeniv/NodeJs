const Product = require("../models/products");

const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render("shop/product-list", { prods: rows, pageTitle: "Shop" });
  }).catch(err => console.log(err));
};

exports.getProductDetail = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([rows, fieldData]) => {
    res.render("shop/product-detail", {
      pageTitle: "Product Detail",
      product: rows[0],
    });
  }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData])=> {
    res.render("shop/index", { products: rows, pageTitle: "Home" });
  }).catch(err => {console.log(err)});
};

exports.getShopProducts = (req, res) => {
  res.render("shop/products", { pageTitle: "Products" });
};

exports.getShopCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find((p) => p.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", { pageTitle: "Cart", products: cartProducts });
    });
  });
};

exports.postShopCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  console.log(prodId);
  res.redirect("/cart");
};

exports.postShopCartDelete = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getShopOrders = (req, res) => {
  res.render("shop/order", { pageTitle: "Orders" });
};

exports.getShopCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};

exports.getAdminProducts = (req, res) => {
  res.render("admin/products", { pageTitle: "Admin Products" });
};
