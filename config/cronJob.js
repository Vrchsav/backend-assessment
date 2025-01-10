const cron = require('node-cron');
const { fetchCryptoPrices } = require('../controllers/cryptoController');

//Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    console.log('Running crypto price fetch job...');
    fetchCryptoPrices();
});
