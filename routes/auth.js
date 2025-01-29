const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate("google",
    {scope:['profile','email'],
}), async (req, res) => {}
);


router.get('/google/callback', passport.authenticate("google",{
    successRedirect: '/product',
    failureRedirect: '/'
}), async (req, res) =>{}
);

router.get('/logout', async (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

module.exports = router;