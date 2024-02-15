const express = require('express');
const router = express.Router();
const Cart = require('../model/cart');
const auth = require("../middleware/auth");


// POST route to add an item to the cart
router.post('/', auth, async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the user doesn't have a cart, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      cart.items.push({ productId, quantity });
    }



    // Recalculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total += (parseInt(item.quantity) * parseInt(item.price)); // Assuming there's a price property on the product
    }, 0);




    // Save the cart
    await cart.save();

    res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'unsuccessful' });
  }
});

module.exports = router;