require('dotenv').config()  


const User = require('../model/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.registerUser = (req,res) => { 
  console.log(req.body, "ghar ka no");
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
  
    User.create(user, (err,user) => {
      if(err) throw err;
      console.log(user,"user created");
      res.send(user)
    })
}


exports.loginUser = (req,res, next) => {
  console.log(req.body, "user in loginUser")
  passport.authenticate('local', { session : false }),
  function(err,user, info){
    if(err){
      return next(err);
    }
    if(!user){
      return res.status(400).send({messae: "no such user"})
    }
    const id = user._id;
    const { email } = user;
    const token = jwt.sign({
      id
    },
      { 'secret': process.env.AppSecret }
    )
    res.send(email, token);
  }(req,res, next);

}

