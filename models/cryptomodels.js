const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., bitcoin, ethereum, matic-network
    price: { type: Number, required: true },  // USD price
    market_cap: { type: Number, required: true },  // Market cap in USD
    change_24hr: { type: Number, required: true },  // 24-hour price change percentage
    fetchedAt: { type: Date, required: true },  // Timestamp when the data was fetched
});

module.exports = mongoose.model('Crypto', cryptoSchema);
