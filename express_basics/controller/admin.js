const Product = require("../models/products");

//GET REQUESTS

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
  // Product.findByPk(prodId); using there general method
  req.user.getProducts({where:{id: prodId}}) //using sequelize method
    .then((products) => {
      let product = products[0];
      if (!product) return res.redirect("/");
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
  // Product.findAll()
  req.user.getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
      });
    })
    .catch((err) => console.log(err));
};

//POST REQUESTS

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({ //sequelize create a createProduct method with the association property
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log("POST add product" + result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const updated = {
    prodId: req.body.productId,
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  };
  Product.findByPk(updated.prodId)
    .then(
      //method provided by sequelize to find by ID (pk)
      (product) => {
        product.title = updated.title;
        product.price = updated.price;
        product.imageUrl = updated.imageUrl;
        product.description = updated.description;
        return product.save(); //method provided by sequelize to save to database
      }
    )
    .then(() => {
      console.log("database updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((result) => {
      return result.destroy();
    })
    .then(() => {
      console.log("product deleted");
    })
    .catch((err) => console.log(err));
  res.redirect("/admin/products");
};
