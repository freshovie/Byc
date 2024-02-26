const express = require("express");
const router = express.Router();
const { Product } = require("../model/product");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");

// get all products

router.get('/', async(req, res) => {
    const category = req.query.category;
    console.log(category)

    try {
        if (!category) return res.status(400).json({ message: 'Category parameter not found!'});

        const productsIncategory = await Product.find({category: category});
        res.json(productsIncategory)
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
