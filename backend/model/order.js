const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    cart: Joi.objectId().required(),
  };
  return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrder;
