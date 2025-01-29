const express = require('express');
const router = express.Router();
const {productModel,validateProduct} = require('../models/productModel.js');
const {categoryModel,validateCategory} = require('../models/categoryModel.js');
const validateAdmin = require('../middlewares/admin.js');
const upload = require('../config/multerConfig.js');

router.get('/', async (req,res)=>{
   const product = await productModel.find();

   if(!product) return res.status(404).json({message:"Error, not found"});
   res.render("index");

});

router.post('/', upload.single("image"),async (req,res)=>{
   try{

   const {name,price,category,stock,description,image} = req.body ;
   let {error} = validateProduct({name,price,category,stock,description,image});

   if(error) return res.send(error.message);
   
   let categoryExists = await categoryModel.findOne({name: category});

   if(!categoryExists){
      validateCategory({name: category});
       await categoryModel.create({name: category});
   };

   let product = await productModel.create({
      name,
      price,
      category,
      stock,
      description,
      image: req.file.buffer,
   });

   res.redirect("/admin/dashboard");

   }
   catch(error){
      return res.status(400).send(error.message);
   }
})

router.delete('/delete/:id',validateAdmin, async(req,res)=>{
   
   //console.log(req.user),   this will contain admin and token info , check before deleting a product 
   try{

      if(req.user.admin){
      const product = await productModel.findOneAndDelete({_id: req.params.id});
      return res.redirect('/admin/products');
      }

      res.send("Unauthorized to delete any product")
   }catch(error){
    console.log("Error in deleting a product"+ error.message);
   }
});

router.post('/delete', validateAdmin, async(req,res)=>{
   try{
   if(req.user.admin){
      let product = await productModel.findOneAndDelete({_id: req.body.product_id})
      return res.redirect('back');
   };
   res.send("Unauthorized to delete any product")
  }
  catch(error){
    console.log("Error in deleting a product"+ error.message);
  }
})



module.exports = router;
