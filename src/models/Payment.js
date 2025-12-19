const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  
      // 🔗 What the payment is for (course, service, order, etc.)
      itemType: {
        type: String,
        required: true,
      },
  
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
  
      // 💰 Payment details
      amount: {
        type: Number,
        required: true,
      },
  
      currency: {
        type: String,
        default: "BDT",
      },
  
      // 🏦 SSLCommerz info
      transactionId: {
        type: String,
        required: true,
        unique: true,
      },
  
      sessionKey: {
        type: String, // provided by SSLCommerz
      },
  
      paymentMethod: {
        type: String, // card, bkash, nagad, rocket
      },
  
      // 📌 Status tracking
      status: {
        type: String,
        default: "pending",
        enum: ["pending", "success", "failed", "cancelled"],
      },
  
      // 🧾 SSLCommerz response (for verification & logs)
      sslResponse: {
        type: Object,
      },
  
      // 📅 Timestamps from SSLCommerz
      paidAt: {
        type: Date,
      },
    },
    { timestamps: true })

const Payment = mongoose.model("Payments", paymentSchema)
module.exports = Payment