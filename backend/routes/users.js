const { User, validate } = require("../model/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

// Route to get user profile (accessible only to admin users)
router.get("/admin-only", isAdmin, async (req, res) => {
  // Find user by ID and exclude password field
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// Route to register a new user
router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);

  // If validation error, return 404 status with error message
  if (error) return res.status(404).send(error.details[0].message);

  // Check if user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // Create new user object with selected properties from request body
  user = new User(_.pick(req.body, ["name", "phone", "email", "password"]));

  // Hash password before saving to database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Save user to database
  await user.save();

  // Generate authentication token
  const token = user.generateAuthToken();

  // Set token in response header and send user details
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "phone", "name", "email"]));
});

module.exports = router;