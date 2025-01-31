const express = require('express');
const router = express.Router();
const {cartModel, validateCart} = require('../models/cartModel');
const {productModel} = require('../models/productModel');
const { isAuthenticated } = require('../middlewares/admin');

router.get('/',isAuthenticated,  async (req,res)=>{
    // res.send(req.session.passport.user); this conatins all the users detail which is currently logged in
   
    try{
    const cart = await cartModel.findOne({user: req.session.passport.user});

    res.send(cart);
    } catch(error){
        res.send(error.message);
    }
});


router.post('/add/:id', async (req,res)=>{
    try{
       let cart = await cartModel.findOne({user: req.session.passport.user});
       let product = await productModel.findById(req.params.id);
       if(!cart){
        cart = await cartModel.create({
            user: req.session.passport.user,
            products: [req.params.id],
            totalPrice:Number(product.price),
         })
       }else{
         cart.products.push(req.params.id);
         cart.totalPrice = Number(cart.totalPrice) + Number(product.price);
         await cart.save();
       }
    }catch(error){
        res.send(error.message);
    }
})

router.get('/remove/:id', isAuthenticated, async (req,res)=>{
    try {
        let cart = await cartModel.findOne({user: req.session.passport.user});
        let product = await productModel.findById(req.params.id);

        if(!cart) return res.send("Something went wrong");

        let index = cart.products.indexof(req.params.id);
        if(index !== -1){ 
            cart.products.splice(index,-1);
            cart.totalPrice = Number(cart.totalPrice) - Number(product.price);
        }
        
        await cart.save();
        res.send(cart)
               
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;