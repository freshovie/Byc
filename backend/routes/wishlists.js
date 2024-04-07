const express = require("express"); //Importing Express framework
const router = express.Router(); //Creating an instance of the express Router
const { User } = require("../model/user"); //Importing User model
const { Product } = require("../model/product"); //Importing  Product model
const { Wishlist } = require("../model/wishlist"); //Importing  Wishlist model
const auth = require("../middleware/auth"); // Importing auth middleware


// @route   GET api/wishlists
// @desc    Get all wishlists
// @access  Public
// Route to get all wishlists
router.get("/", async (req, res) => {
  const wishlists = await Wishlist.find().sort("dateAdded");
  res.send(wishlists);
});

// @route   GET api/wishlists/:id
// @desc    Get a specific wishlist by ID
// @access  Public
// Route to get a specific wishlist by its ID
router.get("/:id", async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  if (!wishlist)
    return res
      .status(404)
      .send(" The Wishlist with the given ID was not found.");
  res.send(wishlist);
});

// @route   POST api/wishlists
// @desc    Create a new wishlist
// @access  Private
// Route to create a new wishlist
router.post("/", async (req, res) => {
  const { customer, products } = req.body; // Extract customer and products from request body

  try {
    // Find user by ID
    const user = await User.findById(customer);
    if (!user) return res.status(404).send("Invalid user");

    // Check if the user already has a wishlist
    let wishlist = await Wishlist.findOne({ customer });

    if (!wishlist) {
      // If the user doesn't have a wishlist, create a new one
      wishlist = new Wishlist({ customer });
    }

    // Add new products to wishlist
    for (const product of products) {
      try {
        const productDetails = await Product.findById(product.productId);
        if (!productDetails) {
          // If product is not found, log the error and send a response
          console.log(`Product with ID ${product.productId} not found`);
          return res.status(404).send({ msg: "Product not found" });
        }

        if (productDetails.numberInStock === 0) {
          // If product is out of stock, log the error and send a response
          console.log(`Product with ID ${product.productId} is out of stock`);
          return res.status(404).send({ msg: "Product is out of stock" });
        }

        const { image, name, code, summary, price } = productDetails;

        // Add the product to the list of wishlist products
        wishlist.products.push({
          _id: product.productId,
          image: image[0],
          name,
          code,
          summary,
          price,
        });

      } catch (error) {
        // If an error occurs while finding the product, log the error and send a response
        console.error("Error finding product:", error);
        return res
          .status(500)
          .json({
            message: "An unexpected error occurred. Please try again later!",
          });
      }
    }

    // Save wishlist to database
    const newWishlist = await wishlist.save();
    res.status(201).json(newWishlist);
  } catch (err) {
    // If an error occurs while creating the wishlist, log the error and send a response
    console.error("Error creating wishlist:", err);
    res
      .status(500)
      .json({
        message: "An Unexpected error occurred. Please try again later!",
      });
  }
});

// @route   DELETE api/wishlists/:userId/removeFromWishlist/:productId
// @desc    Remove a product from user's wishlist
// @access  Private
// Route to delete a product from a wishlist
router.delete("/:wishlistId/:productId", auth, async (req, res) => {
    // Extract wishlistId and productId from request parameters
    const { wishlistId, productId } = req.params;

    try {
        // Find the wishlist by its ID
        const wishlist = await Wishlist.findById(wishlistId);

        // If wishlist not found, return 404 error
        if (!wishlist) return res.status(404).send("Wishlist not found.");

        // Find the index of the product in the wishlist
        const productIndex = wishlist.products.findIndex(
            (product) => product.id === productId
        );

        // If product not found in the wishlist, return 404 error
        if (productIndex === -1) {
            console.error(`Product not found in the cart for ID: ${productId}`);
            return res.status(404).send("Product not found in cart");
        }

        // Remove the product from the wishlist and get the removed product
        const removedProduct = wishlist.products.splice(productIndex, 1)[0];
        
        // Save the updated wishlist
        await wishlist.save();

        // Respond with the removed product
        res.json({ message: "Product removed from the wishlist!"});
        res.status(200).json(removedProduct);
    } catch (e) {
        // Handle any errors
        console.log(e);
        res.status(500).json({message:"Server Error"})
    };
});

// Define a function to clear expired wishlists
const clearExpiredWishlist = async () => {
  try {
    // Get all wishlists from the database
    const wishlists = await Wishlist.find();

    // Iterate through each wishlist
    for (const wishlist of wishlists) {
      // Filter out expired products from the wishlist
      wishlist.products = wishlist.products.filter(product => {
        // Get the creation date of the product
        const creationDate = new Date(product.dateAdded);
        
        // Get the date 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        // Check if the creation date is after 30 days ago
        return creationDate > thirtyDaysAgo;
      });

      // Save the updated wishlist with expired products removed
      await wishlist.save();
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error clearing expired wishlists:', error);
  }
};

// Call the function to clear expired wishlists
clearExpiredWishlist();





module.exports = router;
