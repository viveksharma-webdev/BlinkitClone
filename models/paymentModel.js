const mongoose =require("mongoose");
const joi =require("joi");

const paymentSchema = mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"oderModel",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
        min:0,
    },
    method:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    transactionId: {
        type:String,
        required:true,
        unique:true,
    },
});

// joi validation 

const validatePayment = (data)=>{
    const schema = joi.object({
        order: joi.string().required(),
        amount: joi.number().min(0).required(),
        method: joi.string().required(),
        status: joi.string().required(),
        transactionId: joi.string().required().unique(),

    })
}

module.exports = { 
    paymentModel: mongoose.model("paymentModel",paymentSchema),
    validatePayment 
};