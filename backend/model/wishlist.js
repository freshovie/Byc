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
      }),
      required: true,
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
    products: Joi.array().required(),
  });
  return Joi.validate(wishlist, schema); // Validate the wishlist object against the schema
}

// Export the Wishlist model and the validate function
exports.Wishlist = Wishlist;
exports.validate = validateWishlist;
