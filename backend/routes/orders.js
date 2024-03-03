const express = require("express");
const router = express.Router();
const { Order, validate } = require("../model/order");
const { Product } = require("../model/product");
const { Cart } = require("../model/cart");

//get all orders
router.get("/", async (req, res) => {
  try {
    const order = await Order.find().populate({
      path: "cartId",
      populate: {
        path: "customer",
      },
    });
    if (order.length === 0)
      return res.status(404).send("No order has been placed");

    res.send(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get by orderNo
router.get("/:orderNo", async (req, res) => {
  try {
    const { orderNo } = req.params;

    const order = await Order.findOne({ orderNo }).populate({
      path: "cartId",
      populate: {
        path: "customer",
      },
    });

    if (order.length === 0)
      return res
        .status(404)
        .send("No order found with the provided order number.");

    res.send(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
