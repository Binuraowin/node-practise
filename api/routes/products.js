const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'products/get'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'products/post'
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

module.exports = router;