const express = require('express');
const User = require('../models/User');
const { model } = require('mongoose');
const {default: mongoose} = require('mongoose');
const Products = require('../models/Product');
const verifyToken = require('../middleweres/verifyToken');

const router = express.Router();

router.get("/",verifyToken, async(req, res)=>{
    const result = await User.find();
    return res.json(result)
})

router.get("/:email", async(req, res)=>{
    const email = req.params.email;
    const filter = {email: email};
    const result = await User.findOne(filter);
    return res.json(result)
    // console.log(result);
})

router.post("/", async(req, res)=>{
    const user = new User(req.body);
    const email = {email: user?.email}
    const existingUser = await User.findOne(email)
    if(existingUser){
       return res.json({ message: "User already exist", insertedId: null })
    }
    await user.save();
    return res.status(201).json({success: true, data: user})
    // const result = await User
    // console.log(user);
})

router.get('/admin/:email', async(req, res)=>{
    const email = req.params.email;
    if(!email === req.decoded.email ){
        return res.status(401).json({message: "Unauthorized access!"})
    }
    const filter = {email: email};
    const user = await User.findOne(filter);
    let isAdmin = false;
    if(user?.role === 'admin'){
        isAdmin = true
    };
    return res.json(isAdmin)

})

module.exports = router