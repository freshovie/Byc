const Joi = require("joi")
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
  date: { type: Date, default: Date.now },
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 220,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  category: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Kids"],
    lowercase: true,
    //uppercase: true,
    trim: true
  }
});

const Product = mongoose.model('Image', productSchema);

function validateProduct(product) {
  const Schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(product, Schema);
};

exports.Product = Product;
exports.validate = validateProduct;