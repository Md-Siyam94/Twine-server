const express = require('express');
const Wishlist = require('../models/Wishlist');
const wishlist = require('../models/Wishlist');

const router = express.Router()


// post product wishlist
router.post('/', async(req, res)=>{
    const product = new wishlist(req.body);
    const filter = {productId: product?.productId}
    const existingProduct = await wishlist.findOne(filter)
    if(existingProduct){
        return res.json({message: "product already have in wishlist"})
    }
    await product.save();
    res.status(201).json({success: true, data: product})
})

// get all products in wishlist
router.get('/', async(req, res)=>{
    const products = await wishlist.find()
    res.json(products)
})

// delete product form wishlist
router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const filter = {_id: id};
    const result = await Wishlist.deleteOne(filter);
    res.json(result)
})




module.exports = router