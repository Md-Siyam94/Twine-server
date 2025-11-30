const express = require('express');
const Wishlist = require('../models/Wishlist');
const wishlist = require('../models/Wishlist');

const router = express.Router()


// post product wishlist
router.post('/', async(req, res)=>{
    const product = new wishlist(req.body);
    const existingProduct = await wishlist.findOne({
        productId: product?.productId,
        userEmail: product?.userEmail
    })
    if(existingProduct){
        return res.json({message: "product already have in wishlist"})
    }
    await product.save();
   return res.status(201).json({success: true, data: product})
})

// get all products in wishlist
router.get('/', async(req, res)=>{
    const products = await wishlist.find()
   return res.json(products)
})

// get products from wishlist
router.get('/:email', async(req, res)=>{
    const email = req.params.email;
    const filter = {userEmail: email}
    const products = await wishlist.find(filter)
   return res.json(products)
})

// delete product form wishlist
router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const filter = {_id: id};
    // console.log(filter);
    const result = await Wishlist.deleteOne(filter);
   return res.json(result)
})




module.exports = router