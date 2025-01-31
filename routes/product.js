const express = require('express');
const router = express.Router();
const {productModel,validateProduct} = require('../models/productModel.js');
const {categoryModel,validateCategory} = require('../models/categoryModel.js');
const {validateAdmin,isAuthenticated} = require('../middlewares/admin.js');
const upload = require('../config/multerConfig.js');

router.get('/', isAuthenticated, async (req,res)=>{
   const resultArray = await productModel.aggregate([
      {
          $group:{
              _id: "$category",
              products:{$push:"$$ROOT" }
          },
      },
      {
          $project:{
              _id:0,
              category:"$_id",
              products:{$slice: ["$products",10]}
          }
      }
  ]);

  let rnproducts = await productModel.aggregate([
   {$sample: {size:3}}
  ])

  // convert an array into an object
  const resultObject = resultArray.reduce((acc,item)=>{
         acc[item.category]=item.products;
         return acc;
  },{});

  res.render('index',{products: resultObject, rnproducts})

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
