const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { urlencoded } = require('express');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'products/get'
    })
})

router.post('/',(req,res,next)=>{  
    const product = {
        name: req.body.name,
        price: req.body.price
    };
console.log(req.body)
    res.status(201).json({
        message:'products/post',
        product:product
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;

    if(id === 'special'){
        res.status(200).json({
            message:'discovered id'
        })
    }else{
        res.status(404).json({
            message:'error'
        })
    }
   
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