const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

// Create a new schema for the user model.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 225,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

// userSchema.statics.authenticate = async function (email,password) {
//      const user = await User.findOne({ email });
//      if (!user || !(await bcrypt.compare(password, user.password))) {
//        throw new Error('Invalid Email or Password');
//      }
//      return user.generateAuthToken();
// }

// userSchema.pre('save',function (next) {
//     const user = this ;
//     if(!user.isModified('password')){
//          return next() ;
//     }
//     bcrypt.genSalt(10 , (err , salt)=> {
//           bcrypt.hash(user.password ,salt , (err , hash)=>{
//                user.password=hash ;
//                next() ;
//           })
//     })
// });

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const Schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(225).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, Schema);
}

exports.User = User;
exports.validate = validateUser;
