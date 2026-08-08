const CurrencyConfig = require("../models/CurrencyConfig");
const calculateCoinValue = require("../utils/calculateCoinValue");

// Create Currency Configuration
exports.createCurrency = async (req, res) => {
  try {
    const currency = await CurrencyConfig.create(req.body);

    res.status(201).json({
      success: true,
      message: "Currency configuration created successfully.",
      data: currency,
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A configuration for this country already exists.",
      });
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Active Currencies
exports.getCurrencies = async (req, res) => {
  try {

    const currencies = await CurrencyConfig.find({
      active: true,
    }).sort({
      country: 1,
    });

    res.status(200).json({
      success: true,
      count: currencies.length,
      data: currencies,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get Currency By Country
exports.getCurrencyByCountry = async (req, res) => {
  try {

    const currency = await CurrencyConfig.findOne({
      country: req.params.country,
      active: true,
    });

    if (!currency) {
      return res.status(404).json({
        success: false,
        message: "Currency configuration not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: currency,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


exports.calculateCoins = async (req, res) => {
  try {
    const { coins, country } = req.body;

    if (coins === undefined || !country) {
      return res.status(400).json({
        success: false,
        message: "Coins and country are required.",
      });
    }

    if (Number(coins) < 0) {
      return res.status(400).json({
        success: false,
        message: "Coins cannot be negative.",
      });
    }

    const result = await calculateCoinValue(
      Number(coins),
      country
    );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};