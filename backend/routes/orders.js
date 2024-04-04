const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router
const { Order, validate } = require("../model/order"); // Importing Order model and validation function
const { Product } = require("../model/product"); // Importing Product model
const { Cart } = require("../model/cart"); // Importing Cart model
const auth = require("../middleware/auth"); // Importing auth middleware

// Route to get all orders
router.get("/", async (req, res) => {
  try {
    // Find all orders and populate the associated cart and customer details
    const order = await Order.find().populate({
      path: "cartId",
      populate: {
        path: "customer",
      },
    });
    // If no orders found, send a 404 Not Found response
    if (order.length === 0)
      return res.status(404).send("No order has been placed");

    // Send the orders as the response
    res.send(order);
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response with the error message
    res.status(500).json({ message: err.message });
  }
});

// Route to get order by order number
router.get("/:orderNo", auth, async (req, res) => {
  try {
    const { orderNo } = req.params; // Extract the order number from the request parameters

    // Find the order by order number and populate the associated cart and customer details
    const order = await Order.findOne({ orderNo }).populate({
      path: "cartId",
      populate: {
        path: "customer",
      },
    });

    // If no order found, send a 404 Not Found response
    if (!order)
      return res
        .status(404)
        .send("No order found with the provided order number.");

    // Send the order as the response
    res.send(order);
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response with the error message
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new order
router.post("/", auth, async (req, res) => {
  const userId = req.user._id; // Extracting user ID from request object

  try {
    const { cartItem, company, shippingAddress, status, orderDate } = req.body; // Destructuring request body

    const { error } = validate(req.body); // Validating request body
    if (error) return res.status(400).send(error.details[0].message); // Returning 400 status with error message if validation fails

    const cart = await Cart.findOne({ customer: userId }).populate("products"); // Finding cart for the user
    if (!cart) return res.status(404).send("Cart not found"); // Returning 404 status if cart is not found

    const productsToUpdate = cart.products.map((product) => ({
      // Mapping products in cart to update their stock later
      productId: product.id,
      quantity: product.quantity,
    }));

    cart.products = []; // Emptying cart products
    cart.billing = 0; // Resetting billing to 0
    await cart.save(); // Saving the updated cart

    // Updating stock for each product in the cart
    for (const { productId, quantity } of productsToUpdate) {
      const product = await Product.findById(productId); // Finding product by ID
      if (!product) continue; // Skipping if product is not found

      if (product.numberInStock < quantity) {
        // Checking if there is enough stock
        return res.status(400).send(`Insufficient Stock`); // Returning 400 status if stock is insufficient
      }

      product.numberInStock -= quantity; // Deducting quantity from stock
      await product.save(); // Saving the updated product
    }

    // Function to generate a random order number
    function generateOrderNumber(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Define characters for generating order number
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        ); // Generating random character
      }
      return result; // Returning generated order number
    }

    // Creating a new order with provided details
    const order = new Order({
      orderNo: generateOrderNumber(15), // Generating order number
      cartItem,
      company,
      shippingAddress,
      status,
      orderDate,
    });

    const newOrder = await order.save(); // Saving the new order to the database

    res.status(201).json(newOrder); // Returning 201 status with the new order details
  } catch (error) {
    console.error("Error placing order", error); // Logging error to console
    res.status(500).json({ message: "Internal Server Error" }); // Returning 500 status for any internal server error
  }
});

// Route to update an order
router.put("/:orderNo", auth, async (req, res) => {
  // Validate the request body using Joi
  const { error } = validate(req.body, { abortEarly: false });

  // If there are validation errors, return a 400 status with the first error message
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Find the order by its order number in the request parameters
    const order = await Order.findOneAndUpdate(req.params, req.body, {
      new: true,
    });

    // If the order is not found, return a 404 status with an error message
    if (!order) {
      return res.status(404).send("Order not found");
    }

    // If the update is successful, send a 200 status with the updated order
    res.status(200).send(order);
  } catch (error) {
    // If there's an error during the update process, send a 400 status with the error message
    res.status(400).send(error.message);
  }
});

module.exports = router; // Export the router for use in other files
