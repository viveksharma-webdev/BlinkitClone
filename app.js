const express = require("express");
const app = express();
const indexRouter = require('./routes');
const authRouter = require('./routes/auth.js');
const connectDB = require('./config/mongoose.js');
const path = require('path');
const expressSession = require('express-session');

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


app.use("/",indexRouter);
app.use("/auth", authRouter);

app.listen(3000,()=>{
     connectDB();
});