const mongoose =  require("mongoose");
const joi = require('joi');

const orderSchema =mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    product:[
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:"productModel",
            required:true
        },
    ],
    totalPrice:{
        typr:Number,
        min:0,
        required:true,
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addressModel",
        required:true,
    },
    Status:{
        type:String,
        required:true,
        enum:["pending","in-transit","delivered","cancelled"]
    },
    payment: {
        types:mongoose.Schema.Types.ObjectId,
        ref:"paymentModel",
        required:true
    },
    delivery:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"deliveryModel",
    }
},{timestamps:true});


// Joi validation

const validateOrder = (data)=>{
    const schema = joi.Object({
        user:joi.string().required(),
        product:joi.array().items(joi.string().required()).required(),
        totalPrice: joi.number().min(0).required(),
        address: joi.string().min(5).max(255).required(),
        status: joi.string().valid("pending","in-transit","delivered","cancelled").required(),
        payment: joi.string().required(),
        delivery: joi.string().optional()
    });
    return schema.validate(data);
}


module.exports ={
    orderModel: mongoose.model("orderModel", orderSchema),
    validateOrder
};