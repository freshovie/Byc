const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { Product, validate } = require ("../model/product");


router.get("/", async (req, res) => {
  const products = await Product.find().sort('name')
  res.send (products);
});


router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);
  
  let product = new Product({
    name: req.body.name
  });
  await product.save()
 res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  let product = await Product.findByIdAndUpdate(req.params.id, {name: req.body.name});
  if (!product) res.status(404).send("the course with the id not found");
  res.send(product);
});

router.delete('/:id', async (req, res) => {
  let product = await Product.findOneAndDelete(req.params.id)
  if (!product) return res.status(404).send('product with ID not found')
  res.send(product)
})

router.get("/:id", (req, res) => {
  const product = product.find((g) => g.id == parseInt(req.params.id));
  if (!product) return res.status(404).send("The movie is not found.");
  res.send(product);
});



module.exports = router;