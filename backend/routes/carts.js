const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router
const { Cart } = require("../model/cart"); // Importing Cart model
const { User } = require("../model/user"); // Importing User model
const { Product } = require("../model/product"); // Importing Product model
const auth = require("../middleware/auth"); // Importing auth middleware

// @route   GET api/carts
// @desc    Get all carts
// @access  Public
// Routes to get all carts
router.get("/", async (req, res) => {
  // Fetch all carts from the database and send them as the response
  const carts = await Cart.find().sort("name");
  res.send(carts);
});

// @route   GET api/carts using cartId
// @desc    Get by carts using cartId
// @access  Public
// Routes to get carts by ID
router.get("/:id", async (req, res) => {
  // Find the cart with the specified ID
  const cart = await Cart.findById(req.params.id);
  if (!cart)
    return res.status(404).send("The cart with the given ID was not found.");
  // Send the cart as the response
  res.send(cart);
});

// @route   GET api/carts by user cartId
// @desc    Get carts user cartId
// @access  Public
// Routes to get carts by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;
    // Find all carts associated with the user ID
    const carts = await Cart.find({ customer: userId });
    // Send the carts as the response
    res.json(carts);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error("Error retrieving carts by user ID:", err);
    res.status(500).send("Internal server error");
  }
});

// @route   Post api/carts
// @desc    Post carts
// @access  Private
// Routes to post carts by ID
router.post("/", async (req, res) => {
  // Extract customer ID and products from the request body
  const { customer, products } = req.body;

  try {
    // Find the user associated with the provided customer ID
    const user = await User.findById(customer);
    if (!user) return res.status(404).send("Invalid User");

    let cart = await Cart.findOne({ customer });

    if (!cart) {
      // If cart does not exist for the customer, create a new one
      cart = new Cart({ customer });
    }

    // Iterate over each product in the request and add it to the cart
    for (const product of products) {
      // Find the product details by its ID
      const productDetails = await Product.findById(product.productId);
      // Check if the product exists and is in stock
      if (!productDetails || productDetails.numberInStock === 0) {
        return res.status(404).send("Product not found!");
      }

      // Extract relevant product information
      const { image, name, code, summary, price } = productDetails;

      // Add the product to the cart
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

    // Calculate the total billing amount for the cart
    let totalPrice = 0;
    for (const product of cart.products) {
      totalPrice += product.price * product.quantity;
    }
    cart.billing = totalPrice;

    // Save the updated cart to the database
    const newCart = await cart.save();

    // Send the newly created cart as the response
    res.status(201).json(newCart);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error("Error creating cart:", err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

// @route   Delete api/carts using cartId
// @desc    Delete carts using cartId
// @access  Private
// Routes to delete carts by ID
router.delete("/:cartId/:productId", auth, async (req, res) => {
  // Extract cart ID and product ID from the request parameters
  const { cartId, productId } = req.params;

  try {
    // Find the cart by its ID
    const cart = await Cart.findById(cartId);

    if (!cart) return res.status(404).send("Cart not found");

    // Find the index of the product to be removed from the cart
    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      // If product is not found in the cart, return an error response
      console.error(`Product not found in cart for ID: ${productId}`);
      return res.status(404).send("Product not found in cart");
    }

    // Extract price and quantity of the product to be removed
    const { price, quantity } = cart.products[productIndex];

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Update the total billing amount of the cart
    cart.billing -= price * quantity;

    // Save the updated cart to the database
    await cart.save();

    // Send a success response
    res.json({ message: "Product removed from cart!" });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error("Error deleting product from cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
