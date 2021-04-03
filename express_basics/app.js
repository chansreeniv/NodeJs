const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser'); now part of express

const app = express();
const db = require('./util/database');


app.set('view engine', 'ejs');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controller/error');


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRouter);

app.use(shopRouter);

// db.execute('select * from products').then(result => console.log(result)).catch(err => console.log(err));

app.use(errorController.pageNotFound);

app.listen(3000);