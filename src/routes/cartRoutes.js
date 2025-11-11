const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router()

// get cart products
    router.get("/", async(req, res)=>{
        const cartProducts = await Cart.find()
        res.json(cartProducts)
    })

    // post at cart
    router.post("/", async(req, res)=>{
        const product = new Cart(req.body);
        await product.save()
        res.status(201).json({success: true, data: product})
    })

    // get single product from cart
    router.get("/:id", async(req, res)=>{
        const id = req.params.id;
        const product = await Cart.findById(id);
        res.json(product)

    })

    // delete product from cart
    router.delete("/:id", async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: id}
        console.log(filter);
        // const result = await Cart.deleteOne()
    })




module.exports = router