const mongoose = require("mongoose");
const Joi = require("joi");

const notifySchema = mongoose.Schema({
    user:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"userModel",
            required:true
        },
    ],
    message:{
        type:String,
        required:true,
    },
    read:{
        type:Boolean,
        default:false
    },

},{timestamps: true});

//Joi validation
const validateNotify = (data)=>{
    const schema = Joi.object({
        user:Joi.array().items(Joi.string().required()).required(),
        message:Joi.string().required(),
        read:Joi.boolean().required()
    });
    return schema.validate(data);
}

module.exports = mongoose.model("notifyModel",notifySchema);