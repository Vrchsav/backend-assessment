const Crypto = require('../models/cryptomodels');
const math = require('mathjs');

const getPriceDeviation = async (req, res) => {
  const { coin } = req.query;  


  if (!coin) {
    return res.status(400).json({ message: 'Coin parameter is required.' });
  }

  try {
    // Use case-insensitive search and trim whitespace
    const cryptoData = await Crypto.find({ name: new RegExp(`^${coin.trim()}$`, 'i') })
      .sort({ fetchedAt: -1 })  // Sort by most recent
      .limit(100);


    if (cryptoData.length === 0) {
      return res.status(404).json({ message: `No data found for ${coin}` });
    }

    // Extract the prices from the data
    const prices = cryptoData.map((data) => data.price);

    // Calculate the standard deviation of the prices using mathjs
    const deviation = math.std(prices);

    // Return the deviation
    res.json({ deviation });
  } catch (error) {
    console.error('Error in getPriceDeviation:', error);
    res.status(500).json({ message: 'Error fetching cryptocurrency stats' });
  }
};

module.exports = { getPriceDeviation };
