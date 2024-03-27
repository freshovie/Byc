const Joi = require("joi"); // Importing Joi for request body validation
const { User } = require("../model/user"); // Importing User model
const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router
const _ = require("lodash"); // Importing Lodash utility library
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing

//  Route for  authenticating user
router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);

  // If request body is invalid, send a 400 Bad Request response with the error message
  if (error) return res.status(400).send(error.details[0].message);

  // Find user by email in the database
  let user = await User.findOne({ email: req.body.email });
   // If user does not exist, send a 400 Bad Request response
  if (!user) return res.status(400).send("Invalid email or password");

  // Validate the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // If password is invalid, send a 400 Bad Request response
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // Generate and save an authentication token for the user
  await user.save();
  const token = user.generateAuthToken();
  // Send the user object and the authentication token as the response
  res.json({ user, token });
});

// Function to validate the request body using Joi schema
function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(), // Define validation schema for email
    password: Joi.string().min(5).max(255).required(), // Define validation schema for password

  };
  // Validate the request body against the schema
  return Joi.validate(req, schema);
}

module.exports = router; // Export the router for use in other files
