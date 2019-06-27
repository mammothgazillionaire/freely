require('dotenv').config()  

const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../model/user');


module.exports = function(passport){
  passport.serializeUser(function(user,done){
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done){
    User.findById(id, function(err, user){
      done(err,user);
    })
  });

  passport.use(new localStrategy(
    function(email,password, done){
      User.findOne({email: email}, function(err,user){
        if(err){
          return done(err);
        }
        if(!user){
          return done(null,false, {message : "No such user"});
        }
        user.verifyPassword(password, function(err, isMatched){
          if(!isMatched){
            return done(null,fasle)
          }
          return done(null,user);
        })
      })
    }
  ))

  passport.use(new GoogleStrategy({
          clientID: process.env.clientId,
          clientSecret: process.env.clientSecret,
          callbackURL: "http://localhost:8888/auth/google/callback",
          passReqToCallback: true,
        },
        function(accessToken, refreshToken, profile, done) {
          // console.log(accessToken);
          console.log(profile, "profile in gooogleStrategy")
          User.findOne({ googleId: profile.id }, (err,user) => {
            if(err) return done(err);
            if(!user){
              const user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
              })
              user.save((err,user) => {
                if(err) throw err;
                return done(null,user);
              })
            }
          })
      }          
))


}

