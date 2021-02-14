const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Order = require('../models/order')
const Product = require("../models/products");

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
  Product.findById(req.body.productId).then(product =>{
    if(!product){
      return res.status(404).json({
        message:"product not found"
      })
    }
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      product: req.body.productId,
      quantity: req.body.quantity
  });
  return order.save()
  }).then(
    result =>{
        res.status(200).json({
            createdOrder:{
                _id: result._id,
                product: result.product,
                quantity: result.quantity 
            },
            request: {
                type: "POST",
                url: "http://localhost:3000/orders/" + result._id
              }
        })
    }
).catch( err =>{
    res.status(500).json({
        error: err
      });
})  
})
router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'orders/updated'
    })  
})


module.exports = router;