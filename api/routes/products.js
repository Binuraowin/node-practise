const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products')

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'products/get'
    })
})

router.post('/',(req,res,next)=>{  
    const product =new Product(
        {
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save()
console.log(req.body)
    res.status(201).json({
        message:'products/post',
        product:product
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;

    Product.findById(id).exec().then(doc =>{
        res.status(200).json(doc);
    }).catch(err => console.log(err));
   
})

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'updated'
    })  
})

router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'deleted'
    })  
})

module.exports = router;