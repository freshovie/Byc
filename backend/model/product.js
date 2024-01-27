const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "A product should have at least one image!",
      },
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      minLength: 10,
      maxLength: 100,
      required: true,
    },
    isAvailable: Boolean,
    price: {
      type: Number,
      required: function () {
        return this.isAvailable;
      },
      min: 10,
      max: 220,
    },
    category: {
      type: [String],
      required: true,
      enum: ["Men", "Women", "Kids"],
      lowercase: true,
      trim: true,
    },
    tag: {
      type: [String],
      required: true,
      enum: ["boxers", "camisole", "pants", "t-shirts", "singlets", "towels"],
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
);

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const Schema = {
    image: Joi.array().required(),
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().required(),
    isAvailable: Joi.boolean(),
    price: Joi.number().required(),
    category: Joi.array().required(),
    tag: Joi.array().required(),
  };
  return Joi.validate(product, Schema);
}

exports.Product = Product;
exports.validate = validateProduct;
