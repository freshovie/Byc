const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
     customer: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
    const schema = {

    }
    return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrder;