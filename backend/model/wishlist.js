const Joi = require("joi"); // Import Joi for input validation
const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions

// Define the schema for the Wishlist model
const wishlistSchema = new mongoose.Schema({
  // Reference to the User model for the customer
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true, // Customer is required for a wishlist
  },
  // Array of products in the wishlist
  products: [
    {
      type: new mongoose.Schema({
        // Product details
        image: {
          type: String,
        },
        name: {
          type: String,
          minlength: 4, // Minimum length for product name
          maxLength: 25, // Maximum length for product name
        },
        code: {
          type: String,
        },
        summary: {
          type: String,
          minlength: 10, // Minimum length for product summary
          maxLength: 100, // Maximum length for product summary
        },
        price: {
          type: Number,
        },
        color: [
          {
            type: String,
            enum: ["s", "m", "l", "xl"], // Allowed colors for product
          },
        ],
      }),
      required: true, // Each product is required in the wishlist
    },
  ],
  dateAdded: {
    type: Date,
    default: Date.now, // Default value for date added is the current date
  },
});

// Create the Wishlist model using the schema
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// Function to validate the wishlist object using Joi schema validation
function validateWishlist(wishlist) {
  const schema = Joi.object({
    products: Joi.array().required(), // Validate products as an array (required)
  });
  return Joi.validate(wishlist, schema); // Validate the wishlist object against the schema
}

// Export the Wishlist model and the validate function
exports.Wishlist = Wishlist;
exports.validate = validateWishlist;
