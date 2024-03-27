const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Blog model
const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        minlength: 15,
        maxlength: 70,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        minlength: 20,
        required: true
    },
    views: {
        type: Number,
        min: 0,
        default: 0
    },
    likes: {
        type: Number,
        min: 0,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

// Create the Blog model using the schema
const Blog = mongoose.model("Blog", blogSchema);

// Function to validate the blog object using Joi schema validation
function validateBlog(blog) {
    const schema = {
        image: Joi.string().required(),
        title: Joi.string().min(15).max(50).required(),
        author: Joi.string().required(),
        body: Joi.string().min(20).required(),
    };
    return schema.validate(blog); // Validate the blog object against the schema
}

// Export the Blog model and the validate function
exports.Blog = Blog;
exports.validate = validateBlog;
