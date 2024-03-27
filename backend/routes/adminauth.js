const Joi = require("joi");
const { User } = require("../model/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Route to authenticate user
router.post("/", async (req, res) => {
  // Validate request body
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    // Check if user is admin
    if (!user.isAdmin)
      return res.status(403).json({ message: "Access forbidden" });

    // Generate JWT token with user ID payload
    const token = user.generateAuthToken();

    // Return user and token if authentication is successful
    res.json({ user, token });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Validate request body schema using Joi
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
