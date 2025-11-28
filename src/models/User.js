const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    phoneNumber: {
        type: Number || String,

    },
    photo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }

},
    { timestamps: true }
)

const User = mongoose.model("users", UserSchema)

module.exports= User;