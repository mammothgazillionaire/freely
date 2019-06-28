require('dotenv').config()  

const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../model/user');


module.exports = function(passport){
  
  passport.serializeUser(function(user,done){
    // console.log('serializeUser');
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done){
    // console.log('deserializeUser');
    User.findById(id, function(err, user){
      done(err,user);
    })
  });

  passport.use(new localStrategy({ usernameField: 'email' },function(email, password, done) {
    User.findOne({email: email},function(err,user){
      user.comparePassword(password,(err, isMatch) => {
        if(err){
          return done(err)
        };
        if(!isMatch){
          return done(null,false);
        }
        // console.log(user,"in passport.js")
          return done(null,user);
        })
      })      
    }
  ))

  passport.use(new GoogleStrategy({
          clientID: process.env.clientId,
          clientSecret: process.env.clientSecret,
          callbackURL: "http://localhost:8888/auth/google/callback",
          // passReqToCallback: true,
        },
        function(accessToken, refreshToken, profile, done) {
          // console.log(profile, "profile in gooogleStrategy");
          User.findOne({ googleId: profile.id }, (err,user) => {
            if(err) return done(err);
            if(!user){
              // console.log(accessToken);
              const user = new User({
                googleAuthToken: accessToken,
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

