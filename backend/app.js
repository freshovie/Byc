const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

mongoose
  .connect("mongodb://localhost/byc")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.log("could not connect to mongoDB...", err));

app.use(express.json());
app.use("/api/products", productRoutes); //Use the productRoutes for handling product-related routes.
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}....`);
});
