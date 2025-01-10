const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 4000;




app.use(express.json());
app.use(express.urlencoded());

app.use(cors(
    
));

const db=require("./config/database");
db.connect();
require('./config/cronJob');

const cryptoRoutes  = require('./routes/cryptoRoutes');

// Use the routes
app.use('/api', cryptoRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
