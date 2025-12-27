// Store ID: echot6943cb2f5d397
// Store Password (API/Secret Key): echot6943cb2f5d397@ssl


// Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)



// Store name: testechotfv6p
// Registered URL: www.twinewere.com
// Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v3/api.php
// Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?wsdl
// Validation API (Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

const express = require('express');
const Payment = require('../models/Payment');
const { default: mongoose } = require('mongoose');
const { default: axios } = require('axios');
const router = express.Router()
// initiate payment

// create payment
router.post('/create-ssl-payment', async (req, res) => {
    const orderInfo = new Payment(req.body);
    const trxId = new mongoose.Types.ObjectId().toString()
    const initiate = {
        store_id: `${process.env.store_id}`,
        store_passwd: `${process.env.store_passwd}`,
        total_amount: orderInfo?.totalPrice,
        currency: 'BDT',
        tran_id: trxId, // use unique tran_id for each api call
        success_url: 'http://localhost:5700/success-payment',
        fail_url: 'http://localhost:5700/fail',
        cancel_url: 'http://localhost:5700/cancel',
        ipn_url: 'http://localhost:5700/ipn-success-payment',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: orderInfo?.userName,
        cus_email: orderInfo?.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: orderInfo?.phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    }
    const iniRespons = await axios.post(' https://sandbox.sslcommerz.com/gwprocess/v4/api.php',initiate)
    console.log(iniRespons);
})


module.exports = router