// controllers/cryptoDataController.js

const Crypto = require('../models/cryptomodels'); // Import the crypto model

// Controller function to get cryptocurrency data from the database
exports.getCryptoData = async (req, res) => {
  try {
    // Fetch all crypto data from the database
    const data = await Crypto.find(); 

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No cryptocurrency data found' });
    }

    // Send the data to the client
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
