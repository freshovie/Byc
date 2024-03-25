const express = require("express");
const { Cart } = require("../model/cart");
const { User } = require("../model/user");
const { Product } = require("../model/product");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const carts = await Cart.find().sort("name");
  res.send(carts);
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart)
    return res.status(404).send("The cart with the given ID was not found.");
  res.send(cart);
});

// Get carts by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const carts = await Cart.find({ customer: userId });
    res.json(carts);
  } catch (err) {
    console.error("Error retrieving carts by user ID:", err);
    res.status(500).send("Internal server error");
  }
});

//Post to create new cart
router.post("/", async (req, res) => {
  const { customer, products } = req.body;

  if (!customer || !products || !Array.isArray(products)) {
    return res.status(400).send("Invalid input");
  }

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
    console.error("Error creating cart:", err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

// DELETE cart by ID
router.delete("/:cartId/:productId", auth, async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) return res.status(404).send("Cart not found");

    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      console.error(`Product not found in cart for ID: ${productId}`);
      return res.status(404).send("Product not found in cart");
    }

    const { price, quantity } = cart.products[productIndex];

    cart.products.splice(productIndex, 1);

    cart.billing -= price * quantity;

    const updatedCart = await cart.save();

    res.json({ message: "Product removed from cart!" });
  } catch (err) {
    console.error("Error deleting product from cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
