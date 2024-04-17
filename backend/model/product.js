const Joi = require("joi");
const mongoose = require("mongoose");

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  // Array of images for the product
  image: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    // Custom validator to ensure at least one image is provided
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A product should have at least one image!",
    },
  },
  // Name of the product
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  // Product code or identifier
  code: {
    type: String,
    required: true,
  },
  // Description of the product
  description: {
    type: String,
    minLength: 10,
    maxLength: 100,
    required: true,
  },
  // Availability status of the product
  isAvailable: Boolean,
  // Price of the product
  price: {
    type: Number,
    
  },
  // Category of the product (e.g., Men, Women, Kids)
  category: {
    type: [String],
    required: true,
    enum: ["Men", "Women", "Kids"],
    lowercase: true,
    trim: true,
  },
  // Tags associated with the product (e.g., boxers, camisole, etc.)
  tag: {
    type: [String],
    required: true,
    enum: ["Boxers", "Camisole", "Pants", "T-Shirts", "Singlets", "Towels"],
  },
  // Number of items in stock for the product
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  // Date when the product was added
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the Product model using the schema
const Product = mongoose.model("Product", productSchema);

// Function to validate the product object using Joi schema validation
function validateProduct(product) {
  const schema = {
    image: Joi.array().required(), // Validate image as an array and required
    name: Joi.string().required(), // Validate name as a string and required
    code: Joi.string().required(), // Validate code as a string and required
    description: Joi.string().required(), // Validate description as a string and required
    isAvailable: Joi.boolean(), // Validate isAvailable as a boolean (optional)
    price: Joi.number(), // Validate price as a number (optional)
    category: Joi.array().required(), // Validate category as an array and required
    tag: Joi.array().required(), // Validate tag as an array and required
    numberInStock: Joi.number().min(0).required(), // Validate numberInStock as a number, minimum 0, and required
  };
  return Joi.validate(product, schema); // Validate the product object against the schema
}

// Export the Product model and the validate function
exports.Product = Product;
exports.validate = validateProduct;
