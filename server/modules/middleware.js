const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.loginMiddleware = (req,res,next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if(!token){
    req.user = null;
    next()
  } else {
    jwt.verify(token, process.env.AppSecret,(err,decode) => {
      if(err) return res.json(err);
      // console.log(decode, "check czech");
      req.user = decode;
      next();
    })
  }  
};

exports.verifyToken = (req,res,next) => {
  if(!req.user) return res.json({error: 'Unauthorized'}) 
  next();
}