const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Blog model
const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true // Image is required
    },
    title: {
        type: String,
        minlength: 15, // Title must be at least 15 characters long
        maxlength: 100, // Title can't exceed 100 characters
        required: true // Title is required
    },
    author: {
        type: String,
        required: true // Author is required
    },
    body: {
        type: String,
        minlength: 20, // Body must be at least 20 characters long
        required: true // Body is required
    },
    views: {
        type: Number,
        min: 0, // Views can't be negative
        default: 0 // Default value for views is 0
    },
    likes: {
        type: Number,
        min: 0, // Likes can't be negative
        default: 0 // Default value for likes is 0
    },
    dateAdded: {
        type: Date,
        default: Date.now // Default value for dateAdded is the current date and time
    }
});

// Create the Blog model using the schema
const Blog = mongoose.model("Blog", blogSchema);

// Function to validate the blog object using Joi schema validation
function validateBlog(blog) {
    const schema = {
        image: Joi.string().required(), // Image must be a string and is required
        title: Joi.string().min(15).max(50).required(), // Title must be a string, between 15 and 50 characters, and is required
        author: Joi.string().required(), // Author must be a string and is required
        body: Joi.string().min(20).required(), // Body must be a string, at least 20 characters long, and is required
    };
    return Joi.validate(blog, schema); // Validate the blog object against the schema
}

// Export the Blog model and the validate function
exports.Blog = Blog;
exports.validate = validateBlog;
