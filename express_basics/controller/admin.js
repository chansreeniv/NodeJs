const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
  };
  
exports.postAddProduct = (req, res) => {
    // console.log(req.body);
    // products.push({title: req.body.title});
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
  };

exports.getProducts =(req, res) =>{
    Product.fetchAll((products) => {
        res.render("admin/products", { prods: products, pageTitle: "Admin Products" });
      });
}
