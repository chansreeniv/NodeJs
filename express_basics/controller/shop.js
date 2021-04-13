const Product = require("../models/products");

//GET requests

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetail = (req, res) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", { products: products, pageTitle: "Home" });
    })
    .catch((err) => console.log(err));
};

exports.getShopProducts = (req, res) => {
  res.render("shop/products", { pageTitle: "Products" });
};

exports.getShopCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      console.log("getShopCart" + cart);
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", { pageTitle: "Cart", products: products });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getShopOrders = (req, res) => {
  req.user
    .getOrders({ include: ["products"] }) //eager loading sequelize pluralize the product table
    .then((orders) => {
      res.render("shop/orders", { pageTitle: "Orders", orders: orders });
    })
    .catch((err) => console.log(err));
};

exports.getShopCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};

exports.getAdminProducts = (req, res) => {
  res.render("admin/products", { pageTitle: "Admin Products" });
};

// POST requests

exports.PostShopOrders = (req, res) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.postShopCart = (req, res) => {
  const prodId = req.body.productId;
  let fetchCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity += oldQuantity;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postShopCartDelete = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
