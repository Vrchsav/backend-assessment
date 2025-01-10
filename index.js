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

const rout = require('./routes/check');


app.use('/api/check', rout);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
