// routes/cryptoRoutes.js

const express = require('express');
const router = express.Router();
const { getCryptoData } = require('../controllers/cryptoDataController'); // Updated import
const { getCryptoStats } = require('../controllers/cryptoController');  


// Route to fetch crypto data
router.get('/crypto-data', getCryptoData);
router.get('/stats', getCryptoStats);


module.exports = router;
