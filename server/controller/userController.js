require('dotenv').config()  


const User = require('../model/user');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');

exports.registerUser = (req,res) => { 
    User.create(req.body, (err,user) => {
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
    const json = jwt.sign({
      id
    },
      { 'secret': process.env.AppSecret }
    )
    res.send(email, token);
  }(req,res, next);

}

