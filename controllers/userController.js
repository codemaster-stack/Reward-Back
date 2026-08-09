const User = require("../models/User");
const CurrencyConfig = require("../models/CurrencyConfig");
const calculateCoinValue = require("../utils/calculateCoinValue");
const generateGuestId = require("../utils/generateGuestId");

exports.createGuest = async (req, res) => {
  try {
    const { country } = req.body;

    // Default country if none is provided
    const selectedCountry = country || "Nigeria";

    // Find currency configuration
    const currencyConfig = await CurrencyConfig.findOne({
      country: selectedCountry,
      active: true,
    });

    if (!currencyConfig) {
      return res.status(400).json({
        success: false,
        message: `Currency configuration not found for ${selectedCountry}`,
      });
    }

    // Generate guest ID
    const guestId =
      "GST-" +
      Math.random().toString(36).substring(2, 10).toUpperCase();

    const user = await User.create({
      accountType: "guest",
      guestId,
      country: currencyConfig.country,
      currency: currencyConfig.currency,
      coinBalance: 0,
      cashBalance: 0,
      totalEarnedCoins: 0,
      totalWithdrawn: 0,
      withdrawalEligible: false,
      status: "Active",
    });

    res.status(201).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getUserWallet = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const wallet = await calculateCoinValue(
      user.coinBalance,
      user.country
    );

    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        accountType: user.accountType,

        coins: wallet.coins,

        totalEarnedCoins: user.totalEarnedCoins,

        currency: wallet.currency,

        currencySymbol: wallet.currencySymbol,

        cashValue: wallet.cashValue,

        minimumWithdrawalValue:
          wallet.minimumWithdrawalValue,

        withdrawalEligible:
          wallet.withdrawalEligible,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};