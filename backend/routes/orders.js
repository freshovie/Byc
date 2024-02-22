const express = require("express");
const router = express.Router();
const { User } = require("../model/user");
const { Order } = require('../model/order');
const { Product } = require("../model/product");

//get all orders
router.get("/", async (req, res) => {
    const orders = await orderBy.find().sort("name");
    res.send(orders);
});

//post orders
router.post("/", async (req, res) => {
    const { customer, products } = req.body;

    try {
        //check if user exist.
        const user = await User.findById(customer);
        if (!user) return res.status(404).send("User not found");

        // Create a new order
        const order = new Order({ customer });

        // Add products to the order
        for (const product of products) {
            const productDetails = await Product.findById(product.productId);
            if (!productDetails || productDetails.numberInStock === 0) {
                return res.status(404).send('Product not found or out of stock');
            }
        }

        // Add product to the order
        order.products.push({
            productId: product.productId,
            quantity: product.quantity,
            price: productDetails.price,
            // You can add more fields here like color, size, etc. if needed
        });

        // Calculate total billing amount
        order.billing = order.products.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);

        const newOrder = await order.save();

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;