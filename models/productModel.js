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
        type:Boolean,
        required:true,
        default:true,
    },
    description:{
        type:String,
        required:false,
    },
    imageURL:{
        type:String,
        required:true,
    },
});


const validateProduct = (data) =>{
    const schema = joi.Object({
        name:joi.string().min(5).max(50).required(),
        price: joi.number().min(10).required(),
        category: joi.string().required(),
        description: joi.string().optional(),
        imageURL: joi.string().optional(),
        stock: joi.boolean().required(),
    })
    return schema.validate(data);
}

module.exports ={
     productModel: mongoose.model("productModel",productSchema),
     validateProduct,
}