// routes/cryptoRoutes.js

const express = require('express');
const router = express.Router();
const { getCryptoData } = require('../controllers/cryptoDataController'); // Updated import
const { getCryptoStats } = require('../controllers/cryptoController');  
const { getPriceDeviation } = require('../controllers/PriceDeviationController'); // Import the controller



// Route to fetch crypto data
router.get('/crypto-data', getCryptoData);
router.get('/stats', getCryptoStats);
router.get('/deviation', getPriceDeviation);



module.exports = router;
