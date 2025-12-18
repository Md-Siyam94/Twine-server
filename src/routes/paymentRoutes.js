// Store ID: echot6943cb2f5d397
// Store Password (API/Secret Key): echot6943cb2f5d397@ssl


// Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)


 
// Store name: testechotfv6p
// Registered URL: www.twinewere.com
// Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v3/api.php
// Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?wsdl
// Validation API (Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

const express = require('express');
const router = express.Router()
// initiate payment

    router.post('/create-ssl-payment')