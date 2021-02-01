const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const morgan = require('morgan');

app.use(morgan('dev'))

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const err = new Error('not found');
    err.status = 404;
    next(err);
})

app.use((err, req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        err:{
            message:err.message
        }
    })
})

module.exports = app;