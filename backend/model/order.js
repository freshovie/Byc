const Joi = require("joi");
const mongoose = require("mongoose");

// Define the schema for the Order model
const orderSchema = new mongoose.Schema(
  {
    // Reference to the User model for the customer
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Unique order number
    orderNo: {
      type: String,
      required: true,
    },
    // Reference to the Cart model for the items in the order
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    // Company name (optional)
    companyName: {
      type: String,
    },
    // Shipping address details
    shippingAddress: {
      country: {
        type: String,
        required: true,
      },
      town: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    // Order status (enum with predefined values)
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled", "shipped", "completed"],
      default: "pending",
    },
    // Date of the order
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Create the Order model using the schema
const Order = mongoose.model("Order", orderSchema);

// Function to validate the order object using Joi schema validation
function validateOrder(order) {
  const schema = {
    cart: Joi.objectId().required(), // Validate cart as a valid ObjectId
    orderNo: Joi.string().min(5).required(), // Validate orderNo as a string with minimum length of 5 characters
  };
  return Joi.validate(order, schema); // Validate the order object against the schema
}

// Export the Order model and the validate function
exports.Order = Order;
exports.validate = validateOrder;
