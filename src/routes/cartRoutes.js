const express = require('express');
const Cart = require('../models/Cart');
const { default: mongoose, isValidObjectId } = require('mongoose');

const router = express.Router()

// post at cart
router.post("/", async (req, res) => {
    const product = new Cart(req.body);
    // todo: make 
    const existingProduct = await Cart.findOne({
        productId: product?.productId,
        userEmail: product?.userEmail
    })
    console.log(existingProduct);
    if (existingProduct) {
        return res.json({ message: "Product already have in cart" })
    }
    await product.save()
   return res.status(201).json({ success: true, data: product })
})


// get cart products
router.get("/", async (req, res) => {
    const cartProducts = await Cart.find()
   return res.json(cartProducts)
})

// get product by email
router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const filter = { userEmail: email };
    const products = await Cart.find(filter);
   return res.json(products)
})


// get single product from cart
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Cart.findById(id);
   return res.json(product)

})

// delete product from cart
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const result = await Cart.deleteOne(filter)
   return res.json(result)
})




module.exports = router