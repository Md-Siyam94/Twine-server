// const mongoose = require('mongoose');

const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    Productname: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    size: {
        type: Array || String,
        default: null
    },
    color: {
        type: Array || String,
        default: null
    }
},
    { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema)
module.exports = Cart