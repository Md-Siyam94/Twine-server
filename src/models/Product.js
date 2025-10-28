const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: true,
    },
    color: {
        type: Array || String,
        required: true,
    },
    material: {
        type: String,
    },
    inStock: {
        type: Boolean,
        required: true,
        enum: [true, false]
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    targetAudience: {
        type: String,
        required: true,
        
    }
},
    { timestamps: true }
)
const Products = mongoose.model("products", ProductSchema)

module.exports = Products;