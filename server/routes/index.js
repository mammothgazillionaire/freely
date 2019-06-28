const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('*', (req,res) => {
  res.render('index');
});

// testing forms

// router.get('/login', (req,res) => {
//   res.render('form');
// });

// router.get('/register',(req,res) => {
//   res.render('register');
// });

// router.get('/product' , (req,res) => {
//   res.render('product');
// });


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}) );

router.get('/auth/google/callback', passport.authenticate('google', 
  { failureRedirect: '/login' }),
  (req,res) => {
    console.log(req.user, "in index.js line no 27");
    res.status(200).redirect('/');
  }
)


module.exports = router;