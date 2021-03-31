const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/edit-product",
    editing: false,
  });
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) return res.redirect("/");
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      editing: editMode,
      product: product,
    });
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
    });
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.postEditProduct = (req, res) => {
  const updated = {
    prodId: req.body.productId,
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  };
  const updatedProduct = new Product(
    updated.prodId,
    updated.title,
    updated.imageUrl,
    updated.description,
    updated.price
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct =(req, res) => {
  const prodId = req.body.productId;
  Product.delete(prodId);
  res.redirect('/admin/products');
}