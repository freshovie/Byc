const Joi = require("joi");
const mongoose = require("mongoose");

// Define the schema for the Order model
const orderSchema = new mongoose.Schema(
  {
    // Unique order number
    orderNo: {
      type: String,
      required: true
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
      streetName: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
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
    // Validate cart as a valid ObjectId
    cartId: Joi.objectId().required(),
    // Validate company name as a string (optional)
    company: Joi.string(),
    // Validate shipping address
    shippingAddress: Joi.object({
      // Validate country as a string with min and max length
      country: Joi.string().min(2).max(100),
      // Validate town as a string with min and max length
      town: Joi.string().min(3).max(50),
      // Validate state as a required string
      state: Joi.string().required(),
      // Validate streetName as a string with min and max length
      streetName: Joi.string().min(6).max(80),
      // Validate phone as a number with a regex pattern
      phone: Joi.number().required()
    }).required(),
    // Validate status as a string with predefined values and default to 'pending'
    status: Joi.string().valid('pending', 'confirmed', 'cancelled', 'shipped', 'completed').default('pending'),
    // Validate orderDate as a date with default value of current date
  };
  return Joi.validate(order, schema); // Validate the order object against the schema
}

// Export the Order model and the validate function
exports.Order = Order;
exports.validate = validateOrder;
