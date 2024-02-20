const Joi = require("joi");
const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({

});

const Checkout = mongoose.model("Checkout", checkoutSchema);

function validateCheckout(checkout) {
    
}