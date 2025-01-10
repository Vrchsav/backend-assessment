const axios = require('axios');
require("dotenv").config();


const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY;

exports.checkPing = async ( ) => {
    try {
        const response = await axios.get(`${BASE_URL}/ping`, {
            headers: {
                'x_cg_demo_api_key': API_KEY,
            },
        });
        console.log('Ping Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};

