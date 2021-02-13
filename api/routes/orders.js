const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Order = require('../models/order')

router.get("/", (req, res, next) => {
    Order.find()
      .select("product quantity _id")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

   
router.post('/',(req,res,next)=>{
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order.save().then(
        result =>{
            res.status(200).json(result)
        }
    ).catch( err =>{
        res.status(500).json({
            error: err
          });
    }

    )
    
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