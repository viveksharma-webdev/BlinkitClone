const mongoose = require("mongoose");
const joi = require('joi');

const productSchema =mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
    },
    price:{
        type:Number,
        required:true,
        min:10, 

    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
        default:true,
    },
    description:{
        type:String,

    },
    image:{
        type:Buffer,
   
    },
});


const validateProduct = (data) =>{
    const schema = joi.Object({
        name:joi.string().min(5).max(50).required(),
        price: joi.number().min(10).required(),
        category: joi.string().required(),
        description: joi.string().optional(),
        image: joi.string().optional(),
        stock: joi.number().required(),
    })
    return schema.validate(data);
}

module.exports ={
     productModel: mongoose.model("productModel",productSchema),
     validateProduct,
}