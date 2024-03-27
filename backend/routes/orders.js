const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router
const { Order, validate } = require("../model/order"); // Importing Order model and validation function
const { Product } = require("../model/product"); // Importing Product model
const { Cart } = require("../model/cart"); // Importing Cart model

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
router.get("/:orderNo", async (req, res) => {
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

module.exports = router; // Export the router for use in other files
