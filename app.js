const express = require("express");
const app = express();
const connectDB = require('./config/mongoose.js');
const path = require('path');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes');
const authRouter = require('./routes/auth.js');
const adminRouter = require('./routes/admin.js');
const productRouter = require('./routes/product.js');

require("dotenv").config();
require("./config/googleOathConfig.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(expressSession({
     resave: false,
     saveUninitialized:false,
     secret: process.env.SESSION_SECRET,
}));
app.use(cookieParser());


app.use("/",indexRouter);
app.use("/auth", authRouter);
app.use('/admin', adminRouter);
app.use('/product',productRouter);

app.listen(3000,()=>{
     connectDB();
});