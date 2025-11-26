const express = require('express');
const Product = require('../models/Product');
const Products = require('../models/Product');


const router = express.Router()



// post product
router.post('/', async (req, res) => {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json({ success: true, data: product })
})

// get products
router.get('/', async (req, res) => {
    const category = req.query.category
    console.log(category);
    const products = await Product.find();
    res.json(products)
})

// get products by category
router.get("/:category", async(req, res)=>{
    const category = req.params.category;
    const filter = {category: category}
    // console.log(category);
    const products = await Product.find(filter);
    res.json(products)
})

// get men's products
router.get('/men-products', async (req, res) => {
    const query = { targetAudience: "Men" }
    const products = await Product.find(query)
    // console.log(products);
    res.json(products)
})
// get women's products
router.get('/women-products', async (req, res) => {
    const query = { targetAudience: "Women" }
    const products = await Product.find(query)
    // console.log(products);
    res.json(products)
})

// get single product
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const filter = { _id: id }
    // console.log(filter);
    const product = await Products.findOne(filter);
    res.json(product)
})

// delete single product
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const result = await Product.deleteOne(filter);
    res.json(result)
})



module.exports = router