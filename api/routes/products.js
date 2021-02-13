const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products')

router.get('/',(req,res,next)=>{
    Product.find().exec().then(docs =>{
        res.status(200).json(
            docs
        )
        console.log(docs)
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
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
    product.save().then(
        result => {
            console.log(result);
        }
    ).catch(err => console.log(err));
    res.status(201).json({
        message:'products/post',
        product:product
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;

    Product.findById(id).exec().then(doc =>{
        if (doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message:"Not Found"
            })
        }
        console.log(doc)
    }).catch(
        err => {
            console.log(err);
            res.status(500).json({error:err})
        }
    
        );
   
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