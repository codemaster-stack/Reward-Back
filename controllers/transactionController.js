const Transaction = require("../models/transactionModel");


// GET USER TRANSACTIONS
exports.getUserTransactions = async (req, res) => {

    try {

        const { userId } = req.params;


        const transactions =
            await Transaction
                .find({ user: userId })
                .sort({ createdAt: -1 });


        res.status(200).json({

            success: true,

            count: transactions.length,

            data: transactions

        });


    } catch (error) {

        console.error(
            "Get transactions error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to fetch transactions."

        });

    }

};