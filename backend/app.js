const mongoose = require("mongoose");
const express = require('express');
const app = express();
const { Product } = require("./model/product");

mongoose
  .connect("mongodb://localhost/byc")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.log("could not connect to mongoDB...", err));

app.use(express.json());
app.use('/api/products', Product)

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}....`)});