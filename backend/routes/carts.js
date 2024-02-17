const express = require("express");
const { Cart } = require("../model/cart");
const { User } = require("../model/user");
const { Product } = require("../model/product");

const router = express.Router();

router.get("/", async (req, res) => {
  const carts = await Cart.find().sort("name");
  res.send(carts);
});

router.post("/", async (req, res) => {
  const { customer, products } = req.body;

  try {
    const user = await User.findById(customer);
    if (!user) return res.status(404).send("Invalid User");

    let cart = await Cart.findOne({ customer });

    if (!cart) {
      cart = new Cart({ customer });
    }

    for (const product of products) {
      const productDetails = await Product.findById(product.productId);
      if (!productDetails || productDetails.numberInStock === 0) {
        return res.status(404).send("Product not found!");
      }

      const { image, name, code, summary, price } = productDetails;

      cart.products.push({
        _id: product.productId,
        image: image[0],
        name,
        code,
        summary,
        price,
        quantity: product.quantity,
        color: product.color,
        size: product.size,
      });
    }

    let totalPrice = 0;
    for (const product of cart.products) {
      totalPrice += product.price * product.quantity;
    }
    cart.billing = totalPrice;

    const newCart = await cart.save();

    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
