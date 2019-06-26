const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new schema({
  name : {
    type : String,
    // required: [true, 'cannot be blank'],
    minLength: 4,
    maxLength: 28
  },
  email:{
    type: String,
    // required: [true, 'cannot be blank'],
    unique: true
  },
  password: {
    type: String,
    // required: true,
    minLenght: 6
  },
  phoneNumber: {
    type: Number,
    // required: [true, 'cannot be blank'],
    unique: true,
    minLength : 8,
    maxLength:16
  },
  address : {
    houseNumber: {
      type: Number,
      // required: [true, 'cannot be blank']
    },
    street: {
      type: String,
      // required: [true, 'cannot be blank'] 
    },
    city: {
        type: String,
        // required: [true, 'cannot be blank'],
    },
    coordinates:{
      type: [Number, Number]
    },
    pincode: {
      type: Number,
      // required: [true, 'cannot be blank'],
      minLength: 4,
      maxLength: 12
    },
    landmark: {
      type: String,
      // required: true,
      minLength:4,
      maxLength: 30
    }
  },
  image: {
    type: String
  },
  googleId:{
    type: String
  },
  googleAuthToken:{
    type: String
  }
});

const user = mongoose.model('User', userSchema);

userSchema.methods.verifyPassword = function(userPassword, cb){
  bcrypt.compare(userPassword, this.password, function(err,res){
    console.log(err,"in compare password");
    if(err) cb(err,false);
    cb(null,res);
  });
}

userSchema.pre('save', function(next){
  var password = this.password;
  var self = this;
  console.log('debug1',this, this.password, this.isModified(this.password));

  if(this.isModified(this.password)) return next();


bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
    self.password = hash;
    next();
  });
});


})

module.exports = user;