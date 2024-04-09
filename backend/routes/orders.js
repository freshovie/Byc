const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router
const { Order, validate } = require("../model/order"); // Importing Order model and validation function
const { Product } = require("../model/product"); // Importing Product model
const { Cart } = require("../model/cart"); // Importing Cart model
const auth = require("../middleware/auth"); // Importing auth middleware
const { User } = require("../model/user"); // Importing User middleware

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

//Route to find by orderNo.
router.get("/:orderNo", async (req, res) => {
  try {
    // Find the order by its order number in the request parameters
    const order = await Order.findOne({ orderNo: req.params.orderNo }).populate({
      path: "cartId",
      populate: {
        path: "customer",
      },
    });

    // If no order is found for the orderNo, send a 404 not found response.
    if (!order)
      return res.status(404).send("No order found with the given order number.");

    // Return the requested order
    res.send(order);
  } catch (error) {
    // If there's an error, log it and send a 500 Internal Server Error response
    console.log(`Error in getting order by order No : ${error}`);
    res.status(500).send('Server Error');
  }
});


// Route to create a new order
router.post("/", auth, async (req, res) => {
    const userId = req.user._id;

    try {
        // Destructure req.body
        const { cartId, company, shippingAddress, status, orderDate } = req.body;
        
        // Validate with Joi
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message);
        
        // Retrieve the cart using the provided cart ID
        const cart = await Cart.findOne({ customer: userId }).populate('products');
        if (!cart) return res.status(404).send('Cart not found');

        // Extract the product IDs and quantities associated with the retrieved cart
        const productsToUpdate = cart.products.map(product => ({
            productId: product._id,
            quantity: product.quantity
        }));

        // Clear cart products and reset billing
        cart.products = [];
        cart.billing = 0;

        // Save the updated cart
        await cart.save();

        // Update the stock quantity for each product
        for (const { productId, quantity } of productsToUpdate) {
            const product = await Product.findById(productId);
            if (!product) continue; // Skip if product not found
            
            // Check if there are enough items in stock
            if (product.numberInStock < quantity) {
                return res.status(400).send(`Insufficient stock`);
            }

            // Update the stock quantity
            product.numberInStock -= quantity;
            await product.save();
        }
        
        // Function for generating a random order number
        function generateOrderNumber(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }
        
        // Create new order
        const order = new Order({
            orderNo: generateOrderNumber(15),
            cartId,
            company,
            shippingAddress,
            status,
            orderDate
        });

        // Save the order to the database
        const newOrder = await order.save();

        // Return the newly created order
        res.status(201).json(newOrder);
    } 
    catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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
