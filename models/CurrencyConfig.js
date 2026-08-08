const mongoose = require("mongoose");

const currencyConfigSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    currencySymbol: {
      type: String,
      required: true,
      trim: true,
    },

    coinValue: {
      type: Number,
      required: true,
      min: 0,
    },

    minimumWithdrawalValue: {
      type: Number,
      default: 10000,
      min: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CurrencyConfig",
  currencyConfigSchema
);