const jwt = require('jsonwebtoken');

require('dotenv').config();

function validateAdmin(req,res,next){
    try{
    let token = req.cookies.token;
    if(!token) return res.status(401).json({message: "You need to login first"});
    let data = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = data;
    next();
    }
    catch(error){
        res.send(error.message || "error in admin token validation");
    }
}

async function isAuthenticated(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/users/login');
}

module.exports = { validateAdmin,isAuthenticated };