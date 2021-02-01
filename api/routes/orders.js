const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'orders/get'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'orders/post'
    })
})

router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;

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

router.patch('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'orders/updated'
    })  
})

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'orders/deleted'
    })  
})

module.exports = router;