var GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/userModel.js');
const passport = require('password');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let user = await userModel.findOne({email:profile.emails[0].value});
      
      if(!user){
        user = new userModel({
          email: profile.emails[0].value,  // this gives us the email of the google account user 
          name: profile.displayName,       // this gives us the name of the google account user
        })

        await user.save();
        cb(null,user);    // this is required to pass the control forward 
      }
    } catch (error) {
      cb(error,false);
    }
  }
));

passport.serializeUser(function(user,cb){     // this adds the id of user to our session
  return cb(null,user._id);
});

passport.deserializeUser(async function(id,cb){

   // cb(null,id);  // this will add the id to every request user make, mostly works as a token

   // userModel.findOne({_id:id});   we can also find all the data of user through this;

   let user = await userModel.findOne({_id:id});
    cb(null,user);

})


module.exports = passport;