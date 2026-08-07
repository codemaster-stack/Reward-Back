const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    bannerImage: {
      type: String,
      required: true,
    },

       country: {
        type: String,
        default: "Global"
    },

    currency: {
        type: String,
        default: "USD"
    },

    visibility: {
        type: String,
        enum:["Global","Country"],
        default:"Global"
    },

     totalBudget:{
        type:Number,
        default:0
    },

    totalTasks:{
        type:Number,
        default:0
    },

    participants:{
        type:Number,
        default:0
    },

    startDate: Date,

    endDate: Date,

    status: {
      type: String,
      enum: ["Draft", "Active", "Paused", "Completed"],
      default: "Draft",
    },

    createdBy: {
      type: String,
      default: "Admin",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promotion", promotionSchema);