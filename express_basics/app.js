const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser'); now part of express

const app = express();


app.set('view engine', 'ejs');

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData.routes);

app.use(shopRouter);

app.use((req, res, next) => {
    // res.status(404).send('<h1>Page Not Found</h1>');
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: '404'});
})

app.listen(3000);