require('dotenv').config()  


const User = require('../model/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.registerUser = (req,res) => { 
  // console.log(req.body, "line no 9 registeruser");
  console.log(req.user);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image,
    address: {
      houseNumber: req.body.houseNumber,
      street: req.body.street,
      city:req.body.city,
      coordinates : [req.body.lat || "",req.body.long || ""],
      landmark: req.body.landmark,
      pincode: req.body.pincode
    },
    phoneNumber:req.body.phoneNumber,
    googleId:req.body.googleId || "",
    googleAuthToken: req.body.googleAuthToken || ""
  }
  if(!req.body.name || !req.body.email || !req.body.city || !req.body.phoneNumber){
    return res.status(400).json({ 
      message: "fill required details to register" 
    })
  }
  if( req.body.password.length < 6){
    return res.status(411).json({
      message: "password should be atleast 6 charactars"
    })
  }
    User.create(user, (err,user) => {
      if(err) throw err;
      // console.log(user,"user created");
      res.json(user);
    })
}


exports.loginUser = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    // console.log(user, 'line 42 in userController');
    if (err) { return next(err); }
    if (!user) { 
      return res.redirect('/login'); 
    }
    req.logIn(user, function(err) {
      if (err) { 
        return res.redirect('/login'); 
      }else{
        var payload  = {email: user.email, id: user._id};
        jwt.sign(payload, process.env.AppSecret, {expiresIn : 86400}, (err, token) => {
          // console.log(err, token);
          return res.json({
            success: true,
            token
          }).redirect("/");
        });
      }    
    });
  })(req, res, next);
}



