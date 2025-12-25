const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    
    email: {
        type: String,
        ref: "User",
        required: true,
      },
      userName:{
        type: String,
        required: true
      },
       phone: {
       type: String,
       required: true
       },
       address:{
        type: String,
        required: true
       },
      items: {
        type: [Object],
        ref:"Product",
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      special_instructions:{
        type: String,
        required: true,
      },
      // 🏦 SSLCommerz info
      transactionId: {
        type: String,
        required: true,
        unique: true,
      },
  
      // sessionKey: {
      //   type: String, // provided by SSLCommerz
      // },
  
      // paymentMethod: {
      //   type: String, // card, bkash, nagad, rocket
      // },
  
      // 📌 Status tracking
      status: {
        type: String,
        default: "pending",
        enum: ["pending", "success", "failed", "cancelled"],
      },
  
      // 🧾 SSLCommerz response (for verification & logs)
      // sslResponse: {
      //   type: Object,
      // },
  
    },
    { timestamps: true })

const Payment = mongoose.model("Payments", paymentSchema)
module.exports = Payment