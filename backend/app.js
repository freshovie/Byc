const Joi = require("joi"); // Import Joi for input validation
const config = require("config"); // Import config for configuration settings
const cors = require('cors'); // Import CORS for handling cross-origin requests
const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions
const express = require("express"); // Import express framework
Joi.objectId = require("joi-objectid")(Joi); // Extend Joi with objectId validation support
const app = express(); // Create express application instance

// Import route handlers
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/carts");
const orderRoutes = require("./routes/orders");
const searchRoutes = require("./routes/search");
const adminRoutes = require("./routes/adminauth");
const blogRoutes = require("./routes/blogs");

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost/byc")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.log("could not connect to mongoDB...", err));

// Middleware
app.use(express.json()); // Parse incoming request bodies with JSON payloads
app.use(cors()); // Enable CORS for all routes

// Route handlers
app.use("/api/products", productRoutes); // Use the productRoutes for handling product-related routes
app.use("/api/users", userRoutes); // Use the userRoutes for handling user-related routes
app.use("/api/auth", authRoutes); // Use the authRoutes for handling authentication-related routes
app.use("/api/carts", cartRoutes); // Use the cartRoutes for handling cart-related routes
app.use("/api/orders", orderRoutes); // Use the orderRoutes for handling order-related routes
app.use("/api/search", searchRoutes); // Use the searchRoutes for handling search-related routes
app.use("/api/adminauth", adminRoutes); // Use the adminRoutes for handling admin authentication-related routes
app.use("/api/blogs", blogRoutes); //Use the blogRoutes for handling  blog related routes

// // Error handler
// app.use(function (err, req, res, next) {
//   if (err.type === "entity.parse.failed") {
//     return res.status(400).send({ error: "Bad request payload" });
//   } else if (err.name === "UnauthorizedError") {
//     return res.status(401).send({ type: "unauthorized", message: "Invalid token" });
//   } else if (err.message.startsWith("User not found")) {
//     return res.status(404).send({ type: "not_found", message: err.message });
//   } else if (err instanceof Joi.ValidationError) {
//     return res.status(422).send({ error: `Invalid input data`, details: err.details });
//   }

//   console.error(err.stack);
//   res.status(500).send({ error: "Internal server error" });
// });

// Start the server
const port = process.env.PORT || 1600; // Define the port number
app.listen(port, () => {
  console.log(`listening on port ${port}....`); // Log a message when the server starts listening
});
