const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router()

// post at cart
router.post("/", async (req, res) => {
    const product = new Cart(req.body);
    const productId = { productId: product?.productId };
    // console.log(productId);
    const existingProduct = await Cart.findOne(productId);
    // console.log(existingProduct);
    if (existingProduct) {
        return res.json({ message: "Product already have in cart" })
    }
    await product.save()
    res.status(201).json({ success: true, data: product })
})


// get cart products
router.get("/", async (req, res) => {
    const cartProducts = await Cart.find()
    res.json(cartProducts)
})

// get product by email
router.get("/:email", async(req, res)=>{
    const email = req.params.email;
    const filter = {userEmail: email};
    const products = await Cart.find(filter);
    res.json(products)
})


// get single product from cart
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Cart.findById(id);
    res.json(product)

})

// delete product from cart
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const result = await Cart.deleteOne(filter)
    res.json(result)
})




module.exports = router