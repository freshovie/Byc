const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

// Create a new schema for the user model.
const userSchema = new mongoose.Schema({
  // Name of the user
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  // Phone number of the user
  phone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  // Email of the user
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 225,
  },
  // Password of the user
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  // Flag indicating if the user is an admin
  isAdmin: Boolean,
});

// Method to generate authentication token for the user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

// Function to validate the user object using Joi schema validation
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(), // Validate name as a string with min/max length and required
    phone: Joi.string().min(5).max(50).required(), // Validate phone as a string with min/max length and required
    email: Joi.string().min(5).max(225).required().email(), // Validate email as a string with min/max length, required, and valid email format
    password: Joi.string().min(5).max(255).required(), // Validate password as a string with min/max length and required
  };
  return Joi.validate(user, schema); // Validate the user object against the schema
}

// Export the User model and the validate function
exports.User = User;
exports.validate = validateUser;
