const express = require("express");
const router = express.Router(); // Creating an Express router
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Blog, validate } = require("../model/blog");

// Route to get all blog posts
router.get("/", async (req, res) => {
  // Fetch all blog posts from the database and sort them by dateAdded
  const blogs = await Blog.find().sort("dateAdded");
  // Send the retrieved blog posts as a response
  res.send(blogs);
});

// Route to get a specific blog post by its ID
router.get("/:id", async (req, res) => {
    // Find the blog post by its ID
    const blog = await Blog.findById(req.params.id);
    // If no blog post is found, send a 404 error response
    if (!blog) return res.status(404).send("No blog with that ID");
    // Send the retrieved blog post as a response
    res.send(blog);
});

// Route to create a new blog post
router.post("/", [auth, admin], async (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validate(req.body);
  // If validation fails, send a 400 error response with the validation error message
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new blog post object with data from the request body
  let blog = new Blog({
    image: req.body.image,
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
  });
  // Save the new blog post to the database
  await blog.save();
  // Send the newly created blog post as a response
  res.send(blog);
});

// Route to update an existing blog post by its ID
router.put("/:id", [auth, admin], async (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validate(req.body);
  // If validation fails, send a 400 error response with the validation error message
  if (error) return res.status(400).send(error.details[0].message);

  // Find the blog post by its ID and update its properties with data from the request body
  let blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
    },
    { new: true } // Return the updated document rather than the original one.
  );

  // If no blog post is found with the given ID, send a 404 error response
  if (!blog) return res.status(404).send("The blog with the given ID was not found.");
  
  // Send the updated blog post as a response
  res.send(blog);
});

// Route to delete a blog post by its ID
router.delete("/:id",[auth, admin], async (req, res) => {
  // Find the blog post by its ID and delete it
  let blog = await Blog.findByIdAndDelete(req.params.id);
  
  // If no blog post is found with the given ID, send a 404 error response
  if (!blog)
    return res
      .status(404)
      .send("The blog with the given ID was not found.");
  
  // Send the deleted blog post as a response
  res.send(blog);
});

// Export the router for use in other files
module.exports = router;
