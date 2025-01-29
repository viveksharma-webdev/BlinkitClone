const express = require('express');
const router = express.Router();
const {userModel, validateUser} = require('../models/userModel.js');




router.get('/login', async (req,res)=>{
    res.render('user_login')
});

router.get('/logout', async (req,res,next)=>{
    req.logout(function(err){
        if(err) return next(err);
        req.session(function(err){
            if(err) return next(err);
            res.clearCookie("connect.sid");
            res.redirect('/users/login');
        })
    });
});

router.get('/profile',async (req,res)=>{
   res.render('user_login')
});




module.exports = router;