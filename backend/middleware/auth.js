// Importing required modules
const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware function for user authentication
function auth(req, res, next) {
  // Extracting the JWT token from the request header
  const token = req.header("x-auth-token");
  
  // If no token is provided, return an unauthorized access error
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    // Verifying the authenticity of the token using the secret key
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    
    // Storing the decoded user information in the request object
    req.user = decoded;
    
    // Moving to the next middleware function
    next();
  } catch (ex) {
    // If the token is invalid or expired, return an error
    res.status(400).send("Invalid token.");
  }
}

// Exporting the authentication middleware function
module.exports = auth;
