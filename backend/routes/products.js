const express = require("express");
const router = express.Router();
const { Product, validate } = require("../model/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// get all products
router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

// Get product by id
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

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
  await product.save();
  res.send(product);
});

// Update a product
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

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
  if (!product)
    res.status(404).send("The product with the given ID was not found");
  res.send(product);
});

// Delete a product
router.delete("/:id", [auth, admin], async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return res.status(404).send("The product with the given ID was not found");
  res.send(product);
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");
  res.send(product);
});

module.exports = router;
