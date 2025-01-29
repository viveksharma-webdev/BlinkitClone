const express = require('express');
const router = express.Router();
const {categoryModel, validateCategory} = require('../models/categoryModel');
const validateAdmin = require('../middlewares/admin');

router.post('/create',validateAdmin, async (req,res)=>{

    try{
    const {name} = req.body;
    
    let {error} = validateCategory({name});
    if(error) return res.status(400).send(error.message);
    
    const categoryExists = await categoryModel.findOne({name: name});
    if(categoryExists) return res.send(" category already exists");
    
    const category = await categoryModel.create({name: name});

    res.redirect("back");
    }
    catch(error){
        console.log("error creating category")
        res.send(error.message);
    }
})

module.exports = router;