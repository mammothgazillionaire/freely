const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (err,res) => {
  res.render('form');
})

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}) );

router.get('auth/google/callback', passport.authenticate('google', 
  { failureRedirect: '/login' }),
  (req,res) => {
    console.log(req.user);
    res.status(200).redirect('/');
  }
)


module.exports = router;