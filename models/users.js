const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'please add a name']
    },
    email: {
        type: String,
        required: [true , 'please add an Email'],
        unique:true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "please add a valid email",
        ]
      },
      role:{
        type:String,
        enum: ['admin','user'],
        default: 'user'
      },
      password:{
        type:String,
        required:[true, 'please add a password '],
        minlength: 3,
        select: false
      },
      phone: {
        type: String,
        maxLength: [20, "phone number can not be longer than 20 character"],
        required:[true, 'please add a phone']
      },

      resetPasswordToken: String,
      resetPasswordExpire:Date,
      createdAt:{
        type:Date,
        default: Date.now
      }

});

// Encrypt password using Bcrypt

UserSchema.pre('save', async function(next){
  const salt =await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

// sign jwt and return
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// match user entered password to hashed password in database
UserSchema.methods.matchPassword=async function(enteredpassword){
   return await bcrypt.compare(enteredpassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 