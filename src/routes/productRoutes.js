const express = require('express');
const Product = require('../models/Product');
const Products = require('../models/Product');


const router = express.Router()


// get products
    router.get('/', async (req, res)=>{
        const products = await Product.find();
        res.json(products)
    })

    // post product
    router.post('/', async(req,res)=>{
        const product = new Product(req.body)
        await product.save()
        res.status(201).json({success: true, data: product})
    })

    // get single product
    router.get("/:id", async(req, res)=>{
        const id = req.params.id;
        const product = await Products.findById(id);
        res.json(product)
    })

    // delete single product
    router.delete("/:id", async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: id};
        const result = await Product.deleteOne(filter);
        res.json(result)
    })



    module.exports = router