const express = require('express');
const User = require('../models/User');
const { model } = require('mongoose');
const {default: mongoose} = require('mongoose');

const router = express.Router();

router.get("/", async(req, res)=>{
    const result = await User.find();
    res.json(result)
})

router.post("/", async(req, res)=>{
    const user = req.body;
    // const result = await User
    // console.log(user);
})

module.exports = router