const express = require("express");
const app = express();
const connectDB = require('./config/mongoose.js');
const passport = require('passport');
const path = require('path');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes');
const authRouter = require('./routes/auth.js');
const adminRouter = require('./routes/admin.js');
const productRouter = require('./routes/product.js');
const categoriesRouter = require('./routes/categories.js');
const userRouter = require('./routes/user.js');
const cartRouter = require('./routes/cart.js');
const paymentRouter = require('./routes/payment.js');
const orderRouter = require('./routes/order.js');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


app.use("/",indexRouter);
app.use("/auth", authRouter);
app.use('/admin', adminRouter);
app.use('/products',productRouter);
app.use('/categories',categoriesRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/payment', paymentRouter);
app.use('/order', orderRouter);

app.listen(3000,()=>{
     connectDB();
});