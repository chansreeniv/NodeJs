const path = require("path");

const express = require("express");
// const bodyParser = require('body-parser'); now part of express

const app = express();
const sequelize = require("./util/database");
const Product = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.set("view engine", "ejs");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controller/error");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRouter);

app.use(shopRouter);

// db.execute('select * from products').then(result => console.log(result)).catch(err => console.log(err));

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product); // same as belongs to for scope of learning its used here

User.hasOne(Cart);
Cart.belongsTo(User); //inverse of hasOne its optional

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});
sequelize
  // .sync({force: true}) //should be used to drop all current tables and add new
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "mint", email: "m@nt.com", password: "mint" });
    }
    return Promise.resolve(user); // converting user to promise
  })
  .then((user) => {
    console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(errorController.pageNotFound);
