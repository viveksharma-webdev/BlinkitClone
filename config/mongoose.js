const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI);
    console.log('connected to DB');
};

module.exports = connectDB;