const mongoose = require("mongoose");
const express = require('express');
const app = express();
const productRoutes  = require("./routes/products");

mongoose
  .connect("mongodb://localhost/byc")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.log("could not connect to mongoDB...", err));

app.use(express.json());
app.use('/api/products', productRoutes) //Use the productRoutes for handling product-related routes.

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}....`)});