const Joi = require("joi");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model if you have one
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model if you have one
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

function validateCart(cart) {
  const Schema = {
    userId: Joi.objectId().required(),
    productId: Joi.objectId().required(),
    quantity: Joi.number().required(),
    totalPrice: Joi.number().required(),
  };
  return Joi.validate(cart, Schema);
}

module.exports = Cart;
exports.validate = validateCart;
