const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser'); now part of express

const app = express();


app.set('view engine', 'ejs');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controller/error');


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRouter);

app.use(shopRouter);

app.use(errorController.pageNotFound);

app.listen(3000);