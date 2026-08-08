const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    minimumWithdrawal: {
      type: Number,
      default: 10000,
      min: 0,
    },

    registrationFeePercent: {
      type: Number,
      default: 10,
      min: 0,
      max: 100,
    },

    platformName: {
      type: String,
      default: "Reward",
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    allowGuestTasks: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);