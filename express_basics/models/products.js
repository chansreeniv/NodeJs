const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "products.json");

//helper function
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
  // return products;
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const exisitngProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProduct = [...products];
        updatedProduct[exisitngProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static delete(id) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      const Updatedproducts = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(Updatedproducts), (err) => {
        console.log(err);
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
