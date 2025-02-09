const express = require('express');
const router =express.Router();
const paymentModel = require('../models/paymentModel');

router.get('/:orderid/:paymentid/:signature', async (req,res)=>{
   let paymentDetails= await paymentModel.findOne({orderId: req.params.orderid})

   if(!paymentDetails) return res.status(401).send("Payment not completed");

   if(paymentDetails.paymentId === req.params.paymentid && paymentDetails.signature === req.params.signature){
    res.send("Valid payment signature")
   }else{
    res.send("Invalid Payment")
   }
})



module.exports= router;
