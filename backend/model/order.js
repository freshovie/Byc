const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
   customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    orderNo: {
      type: String,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
      required: true,
    },
    companyName: {
      type: String,
    },
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
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled", "shipped", "completed"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    cart: Joi.objectId().required(),
    orderNo:  Joi.string().min(5).required()
  };
  return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrder;
