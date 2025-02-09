const express = require('express');
const router = express.Router();
const {cartModel, validateCart} = require('../models/cartModel');
const {productModel} = require('../models/productModel');
const { isAuthenticated, validateAdmin } = require('../middlewares/admin');

router.get('/',isAuthenticated,  async (req,res)=>{
    // res.send(req.session.passport.user); this conatins all the users detail which is currently logged in
    try{
    let cart = await cartModel.findOne({user: req.session.passport.user}).populate("products");

    let cartDataStructure = {};
    cart.products.forEach((product)=>{
        let key = product._id.toString();

        if(cartDataStructure[key]){
           cartDataStructure[key].quantity +=1;

        }else{
            cartDataStructure[key]={
                ...product._doc,
                quantity:1
            };
        };

    });

    let finalArray = Object.values(cartDataStructure);
    let finalPrice =cart.totalPrice + 54;

    res.render("cart", {cart: finalArray, finalprice : finalPrice});

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
       res.redirect("back");
       
    }catch(error){
        res.send(error.message);
    }
})

router.get('/remove/:id', isAuthenticated, async (req,res)=>{
    try {
        let cart = await cartModel.findOne({user: req.session.passport.user});
        let product = await productModel.findById(req.params.id);

        if(!cart) return res.send("Something went wrong");

        let index = cart.products.indexOf(req.params.id);
        if(index !== -1){ 
            cart.products.splice(index,1);
            cart.totalPrice = Number(cart.totalPrice) - Number(product.price);
        } else {
            return res.send("Product not found in cart");
        }
        
        await cart.save();
        res.redirect("back");
               
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;