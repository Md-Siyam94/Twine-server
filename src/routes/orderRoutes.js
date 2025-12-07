const express = require('express');
const Order = require('../models/Order');

const router = express.Router()

// get all orders
router.get("/", async(req, res)=>{
    const orders= new Order.find()
    return res.json(orders)
})


module.exports = router