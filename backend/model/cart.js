const Joi = require("joi");
const mongoose = require("mongoose");

// Define the schema for the Cart model
const cartSchema = new mongoose.Schema({
  // Reference to the User model for the customer
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
          minlength: 4,
          maxlength: 25,
        },
        code: {
          type: String,
        },
        summary: {
          type: String,
          minlength: 10,
          maxlength: 100,
        },
        price: {
          type: Number,
        },
        color: [
          {
            type: String,
            enum: ["blue", "green", "purple", "brown", "white", "pink", "black"],
          },
        ],
        size: [
          {
            type: String,
            enum: ["s", "m", "l", "xl"],
          },
        ],
        quantity: {
          type: Number,
          default: 1,
          max: 10,
        },
      }),
      required: true,
    },
  ],
  // Total billing amount for the cart
  billing: {
    type: Number,
    min: 0,
    required: true,
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
