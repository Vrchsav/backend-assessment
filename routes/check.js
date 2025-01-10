const express = require("express");
const router = express.Router();

const { checkPing}=require("../controllers/crypto")

router.get("/",checkPing);


module.exports = router

