const mongoose = require('mongoose');
require('dotenv').config(); // Call the config method

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });
};
