const axios = require('axios');
require('dotenv').config();
const Crypto = require('../models/cryptomodels');  // Assuming you have a MongoDB model for Crypto data

const API_KEY = process.env.COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Function to fetch the crypto data
const fetchCryptoPrices = async () => {
    try {
        // Fetch the cryptocurrency data
        const response = await axios.get(`${BASE_URL}/simple/price`, {
            headers: {
                'x_cg_demo_api_key': API_KEY,
            },
            params: {
                ids: 'bitcoin,ethereum,matic-network', // Cryptocurrency IDs
                vs_currencies: 'usd', // Currency in which prices are returned
                include_market_cap: true,
                include_24hr_change: true,
            },
        });

        const cryptoData = response.data;

        // Log the data (optional)
        console.log('Fetched Crypto Data:', cryptoData);

        // Store the data in the database
        await storeCryptoData(cryptoData);
    } catch (error) {
        console.error('Error in Fetching Crypto Prices:', error.response?.data || error.message);
    }
};

// Function to store the fetched data in the database
const storeCryptoData = async (data) => {
    try {
        // Loop through the data and save each cryptocurrency
        for (let cryptoId in data) {
            const crypto = new Crypto({
                name: cryptoId,
                price: data[cryptoId].usd,
                market_cap: data[cryptoId].usd_market_cap,
                change_24hr: data[cryptoId].usd_24h_change,
                fetchedAt: new Date(),
            });

            await crypto.save();
            console.log(`${cryptoId} data saved successfully`);
        }
    } catch (error) {
        console.error('Error saving Crypto Data to Database:', error.message);
    }
};

const getCryptoStats = async (req, res) => {
    const { coin } = req.query;  // Extract the 'coin' parameter from the query string
  
    // Valid coins we are handling
    const validCoins = ['bitcoin', 'ethereum', 'matic-network'];
  
    if (!coin || !validCoins.includes(coin)) {
      return res.status(400).json({
        error: 'Invalid or missing "coin" parameter. Valid options are: bitcoin, ethereum, matic-network.',
      });
    }
  
    try {
      // Fetch data from CoinGecko API
      const response = await axios.get(`${BASE_URL}/simple/price`, {
        params: {
          ids: coin,
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_change: true,
        },
      });
  
      // Extract relevant data from the response
      const data = response.data[coin];
      
      // Send the fetched data as a response
      return res.json({
        coin: coin,
        price_usd: data.usd,
        market_cap_usd: data.usd_market_cap,
        change_24hr: data.usd_24h_change,
      });
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      return res.status(500).json({
        error: 'An error occurred while fetching the cryptocurrency data.',
      });
    }
  };
  

module.exports = { fetchCryptoPrices  , getCryptoStats };
