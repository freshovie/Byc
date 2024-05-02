const express = require("express");
const router = express.Router();
const { Product, validate } = require("../model/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// GET all products
router.get("/", async (req, res) => {
  // Retrieve all products from the database and sort them by name
  const products = await Product.find().sort("name");
  // Send the list of products as a response
  res.send(products);
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  // Find the product by ID
  const product = await Product.findById(req.params.id);
  // If the product with the given ID is not found, return an error response
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");
  // Send the product as a response
  res.send(product);
});

// Create a new product
router.post("/", [auth, admin], async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);
  // If validation fails, return an error response
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new product object with the data from the request body
  let product = new Product({
    image: req.body.image,
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    isAvailable: req.body.isAvailable,
    price: req.body.price,
    category: req.body.category,
    tag: req.body.tag,
    numberInStock: req.body.numberInStock,
  });
  // Save the new product to the database
  await product.save();
  // Send the newly created product as a response
  res.json(product);
});

// Update a product by ID
router.put("/:id", [auth, admin], async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);
  // If validation fails, return an error response
  if (error) return res.status(400).send(error.details[0].message);

  // Find the product by ID and update its properties with data from the request body
  let product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      isAvailable: req.body.isAvailable,
      price: req.body.price,
      category: req.body.category,
      tag: req.body.tag,
      numberInStock: req.body.numberInStock,
    },
    { new: true } // Return the updated document rather than the original one.
  );
  // If the product with the given ID is not found, return an error response
  if (!product)
    return res.status(404).send("The product with the given ID was not found");
  // Send the updated product as a response
  res.send(product);
});

// Delete a product by ID
router.delete("/:id", [auth, admin], async (req, res) => {
  // Find the product by ID and delete it
  let product = await Product.findByIdAndDelete(req.params.id);
  // If the product with the given ID is not found, return an error response
  if (!product)
    return res.status(404).send("The product with the given ID was not found");
  // Send the deleted product as a response
  res.send(product);
});



module.exports = router;
