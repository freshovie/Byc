const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/order");
const isAdmin = require("../middleware/admin"); // Import admin authorization middleware

// Route to mark an order as lost
router.put("/:orderId/lost", auth, async (req, res) => {
  try {
    // Find the order by ID
    const order = await Order.findById(req.params.orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the authenticated user
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Update order status to "lost"
    order.status = "lost";

    // Save the updated order
    await order.save();

    // Send success response
    res.json({ message: "Order marked as lost successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to retrieve all lost orders (accessible only to admins)
router.get("/lost-orders", auth, isAdmin, async (req, res) => {
  try {
    // Find all orders with status "lost"
    const lostOrders = await Order.find({ status: "lost" });

    // Return the lost orders as response
    res.send(lostOrders);
  } catch (error) {
    // If an error occurs, return an error response
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a list of orders
router.get("/", auth, async (req, res) => {
  try {
    // Get the page and limit query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit;

    // Get orders for the authenticated user, paginated and sorted by date
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Send the orders as a response
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to mark an order as lost (accessible only to admins)
router.put("/mark-lost/:id", auth, isAdmin, async (req, res) => {
  try {
    // Find the order by ID
    const order = await Order.findById(req.params.id);

    // If order is not found, return 404 status with error message
    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Update the order status to "lost"
    order.status = "lost";

    // Save the updated order
    await order.save();

    // Return success message
    res.send("Order marked as lost successfully");
  } catch (error) {
    // If an error occurs, return an error response
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
