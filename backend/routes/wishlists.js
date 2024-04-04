const express = require("express"); //Importing Express framework
const router = express.Router(); //Creating an instance of the express Router
const { User } = require("../model/user"); //Importing User model
const { Product } = require("../model/product"); //Importing  Product model
const {  Wishlist } = require("../model/wishlist"); //Importing  Wishlist model


//get all wishlists
router.get("/", async (req, res) => {
    const wishlists = await Wishlist.find().sort("")
    res.send(wishlists);
});

//Get a specific wishlist by ID
router.get('/:id', async (req, res) => {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist) 
    return res.status(404).send(" The Wishlist with the given ID was not found.");
res.send(wishlist);
});

//Create new wishlist

module.exports = router;
