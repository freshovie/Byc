const Joi = require("joi");
const config = require("config");
const cors = require('cors')
const mongoose = require("mongoose");
const express = require("express");
Joi.objectId = require("joi-objectid")(Joi);
const app = express();
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/carts");
const orderRoutes = require("./routes/orders");
const searchRoutes = require("./routes/search");


mongoose
  .connect("mongodb://localhost/byc")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.log("could not connect to mongoDB...", err));

app.use(express.json());
app.use(cors())

app.use("/api/products", productRoutes); //Use the productRoutes for handling product-related routes.
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/search", searchRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}....`);
});
