const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            enum: [
                "Earning",
                "Withdrawal",
                "Bonus",
                "Adjustment"
            ],
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        reference: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: [
                "Completed",
                "Pending",
                "Rejected"
            ],
            default: "Completed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);