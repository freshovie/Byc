const express = require("express");
const router = express.Router();
const { Order, validate } = require("../model/order");
const { Product } = require("../model/product");
const { Cart } = require("../model/cart");
const { error } = require("joi/lib/types/lazy");

//get all orders
router.get("/", async (req, res) => {
  try {
    const order = await Order.find().populate({
      path: "cartItem",
      populate: {
        path: "customer",
        select: "-password",
        model: "User",
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
      path: "cartItem",
      populate: {
        path: "customer",
        select: "-password",
        model: "User",
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

//post new orders
router.post("/", async (req, res) => {
  try {
    const { cartItem, company, shippingAddress, status, orderDate } = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const cart = await Cart.findById(cartItem).populate("products");
    if (!cart) return res.status(404).send("Cart not found");

    const productsToUpdate = cart.products.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    }));

    for (const { productId, quantity } of productsToUpdate) {
      const product = await Product.findById(productId);
      if (!product) continue;
      //skip if product not found

      if (product.numberInStock < quantity) {
        return res
          .status(400)
          .send(`Insufficient stock for product: ${product.name}`);
      }

      product.numberInStock -= quantity;
      await product.save();
    }

    orderNo: generateOrderNumber(15);

    const order = new Order({
      orderNo,
      cartItem,
      company,
      shippingAddress,
      status,
      orderDate,
    });

    const newOrder = await order.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:orderNo", async (req, res) => {
  const { error } = validate(res.body, { abortEarly: false });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const order = await Order.findOneAndUpdate(
      { orderNo: req.params.orderNo },
      req.body,
      { new: true }
    );
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

function generateOrderNumber(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

module.exports = router;
