const mongoose = require('mongoose');
const Joi = require("joi");

const addressSchema = mongoose.Schema({
    state:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    zip:{
        type:Number,
        required:true,
        min:1000,
        max:99999
    },
    city:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    landmark:{
        type:String,
        required:true,
        min:10,
        max:255
    },
});

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address',
    ],
    },
    password: {
        type:String,
        minlength:6
    },
    phone:{
        type:Number,
        match:/^[0-9]{10}$/,
    },
    addresses:{ 
        type:[addressSchema]
    },

},{timestamps:true}
);

//JOI validation Schema


// validatUser will return true or false and if theres an error then it will give error message
const validateUser = (data)=>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6),
        phone:Joi.string().length(10).pattern(/^[0-9]{10}$/),
        addresses:Joi.array().items(Joi.object({
            state:Joi.string().min(2).max(50).required(),
            zip:Joi.number().min(1000).max(99999).required(),
            city:Joi.string().min(2).max(50).required(),
            landmark:Joi.string().min(10).max(255).required()
        })).max(5),
    })
    return schema.validate(data); // returning the boolean value
}


// how to export two things together using module.exports 
module.exports = {
    userModel: mongoose.model("userModel",userSchema),
    validateUser
};