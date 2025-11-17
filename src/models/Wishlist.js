const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({

    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    brand: {
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
    metarial: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
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
)

const wishlist = mongoose.model('wishlist', wishlistSchema)
module.exports = wishlist