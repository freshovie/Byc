const Joi = require("joi");
const mongoose = require("mongoose");

// Define the schema for the Cart model
const cartSchema = new mongoose.Schema({
  // Reference to the User model for the customer
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User model
  },
  // Array of products in the cart
  products: [
    {
      type: new mongoose.Schema({
        // Product details
        image: {
          type: String,
        },
        name: {
          type: String,
          minlength: 4, // Minimum length of the product name
          maxlength: 25, // Maximum length of the product name
        },
        code: {
          type: String,
        },
        summary: {
          type: String,
          minlength: 10, // Minimum length of the product summary
          maxlength: 100, // Maximum length of the product summary
        },
        price: {
          type: Number,
        },
        color: [
          {
            type: String,
            enum: ["blue", "green", "purple", "brown", "white", "pink", "black"], // Valid color options
          },
        ],
        size: [
          {
            type: String,
            enum: ["s", "m", "l", "xl"], // Valid size options
          },
        ],
        quantity: {
          type: Number,
          default: 1, // Default quantity is 1
          max: 10, // Maximum quantity allowed
        },
      }),
      required: true,
    },
  ],
  // Total billing amount for the cart
  billing: {
    type: Number,
    min: 0, // Minimum billing amount is 0
    required: true, // Billing amount is required
  },
});

// Create the Cart model using the schema
const Cart = mongoose.model("Cart", cartSchema);

// Function to validate the cart object using Joi schema validation
function validateCart(cart) {
  const schema = {
    customer: Joi.objectId().required(), // Validate customer as a valid ObjectId
    products: Joi.array().required(), // Validate products as an array (required)
  };
  return Joi.validate(cart, schema); // Validate the cart object against the schema
}

// Export the Cart model and the validate function
exports.Cart = Cart;
exports.validate = validateCart;
