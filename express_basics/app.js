const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser'); now part of express

const app = express();

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes);

app.use(shopRouter);

app.use((req, res, next) => {
    // res.status(404).send('<h1>Page Not Found</h1>');
    res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
})

app.listen(3000);