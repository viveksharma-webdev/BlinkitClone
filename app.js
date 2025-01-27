const express = require("express");
const app = express();
const indexRouter = require('./routes');
const connectDB = require('./config/mongoose.js');

require("dotenv").config();

app.use(express.json());
//app.use(express.static(path.join(__dirname,)

app.use("/",indexRouter);


app.listen(3000,()=>{
     connectDB();
});