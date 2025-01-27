const mongoose = require("mongoose");
const Joi = require("joi");

const deliverySchema = mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderModel",
        required:true,
    },
    deliveryBoy:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:['pending','in-transit','delivered','cancelled']
    },
    trackingURL:{
        type:String,
    },
    estimatedDeliveryTime:{
        type:Number,
        required:true,
        min:0,
    },
},{timestamps:true});

// JOi validation
const validateDelivery =(data)=>{
    const schema =Joi.object({
        order:Joi.string().required(),
        deliveryBoy:Joi.string().min(3).max(50).required(),
        status:Joi.string().valid("pending","delivered","in-transit","cancelled").required(),
        trackingURL:Joi.string().uri(),
        extimatedDeliveryTime:Joi.number().min(0).required()
    });
    return schema.validate(data);
}

module.exports ={ 
    deliveryModel: mongoose.model("deliveryModel", deliverySchema),
    validateDelivery
};
