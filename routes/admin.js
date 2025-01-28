const express =require('express');
const router = express.Router();
const {adminModel} = require('../models/adminModel.js');
const {productModel} = require('../models/productModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateAdmin = require('../middlewares/admin.js');

require("dotenv").config();

if(process.env.NODE_ENV!== undefined && process.env.NODE_ENV === 'development'){
    router.get('/create',async (req,res)=>{
        
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash("admin",salt);


        let user = new adminModel({
        name: "vivek",
        email:"admin@gmail.com",
        password:hash,
        role: "admin"
        });

        await user.save();

        let token = jwt.sign({email: "admin@gmail.com"},process.env.JWT_SECRET_KEY);
        res.cookie("token", token);
        res.send("admin created successfully");
        
       } catch (error) {
        res.send(error.message);
       }
    })
};

router.get('/login', async (req,res)=>{
    res.render('admin_login');
})

router.post('/login', async (req,res)=>{
    const{email,password} = req.body;

    let admin = await adminModel.findOne({email:email});

    if(!admin){
        return res.status(401).json({messagge:"user not validated"});
    };
    let valid = await bcrypt.compare(password, admin.password);

    if(valid){
        let token = jwt.sign({email: "admin@blink.com"},process.env.JWT_SECRET_KEY);
        res.cookie("token", token);
        res.redirect("/admin/dashboard");
    }
});

router.get('/dashboard',validateAdmin ,async (req,res)=>{
    res.render('admin_dashboard');
})

router.get('/products', validateAdmin, async (req,res)=>{
    let products = await productModel.find();
    res.render('admin_products',{products});
});

router.get('/logout', validateAdmin , async(req,res)=>{
    res.cookie("token","");
    res.redirect("/admin/login");
})

module.exports = router;