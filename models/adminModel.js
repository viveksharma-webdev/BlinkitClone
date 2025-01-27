const mongoose =require("mongoose");
const Joi = require("joi");

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^[\-w\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        required:true,
        enum:["admin","superadmin"]
    },
},{timestamps:true});

//Joi validation schema

const validateAdmin = (data)=>{
    const schema= Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.sring().email().required(),
        password:Joi.string().min(6).required(),
        role:Joi.string().valid("admin","superadmin").required(),
    });
    return schema.validate(data);
}



module.exports ={ 
    adminModel:mongoose.model("adminModel",adminSchema),
    validateAdmin
};