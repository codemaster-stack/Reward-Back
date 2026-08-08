const CurrencyConfig = require("../models/CurrencyConfig");

const calculateCoinValue = async (coins, country) => {
  const currencyConfig = await CurrencyConfig.findOne({
    country,
    active: true,
  });

  if (!currencyConfig) {
    throw new Error(
      `Currency configuration not found for ${country}`
    );
  }

  const value = coins * currencyConfig.coinValue;

  return {
    coins,
    country: currencyConfig.country,
    currency: currencyConfig.currency,
    currencySymbol: currencyConfig.currencySymbol,
    coinValue: currencyConfig.coinValue,
    cashValue: value,
    minimumWithdrawalValue:
      currencyConfig.minimumWithdrawalValue,
    withdrawalEligible:
      value >= currencyConfig.minimumWithdrawalValue,
  };
};

module.exports = calculateCoinValue;