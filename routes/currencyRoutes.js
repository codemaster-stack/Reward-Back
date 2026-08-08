const express = require("express");

const router = express.Router();

const {
  createCurrency,
  getCurrencies,
  getCurrencyByCountry,
  calculateCoins,
} = require("../controllers/currencyController");


router.post("/", createCurrency);

router.get("/", getCurrencies);

router.get("/country/:country", getCurrencyByCountry);

router.post("/calculate", calculateCoins);


module.exports = router;