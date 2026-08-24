const express = require('express');
const path = require('path');
const app = express();
const productRouter = require('./app/product_v1/routes');
const productRouterV2 = require('./app/product_v2/routes');
// const productRouterV3 = require('./app/product_v3/routes');
// const productRouterV4 = require('./app/product_v4/routers');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, "public")));

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);
// app.use('/api/v4', productRouterV4)
// app.use('/api/v3', productRouterV3)



// Catch-all route untuk mengembalikan index.html (SPA Fallback) - tidak untuk API
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api/')) {
        res.status(404).json({
            status: 'failed',
            message: 'Resource ' + req.originalUrl + ' not found'
        });
    } else {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    }
});

module.exports = app;