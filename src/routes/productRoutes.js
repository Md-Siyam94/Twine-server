const express = require('express');
const Product = require('../models/Product');


const router = express.Router()


// get products
    router.get('/', async (req, res)=>{
        const result = await Product.find();
        res.json(result)
    })

    // post product
    router.post('/create', async(req,res)=>{
        const product = new Product(req.body)
        await product.save()
        res.status(201).json({success: true, data: product})
    })



    module.exports = router