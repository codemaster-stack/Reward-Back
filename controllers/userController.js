const User = require("../models/User");
const calculateCoinValue = require("../utils/calculateCoinValue");
const generateGuestId = require("../utils/generateGuestId");

exports.createGuest = async (req,res)=>{

try{

const guest = await User.create({

guestId:generateGuestId()

});

res.status(201).json({

success:true,

user:guest

});

}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

}


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