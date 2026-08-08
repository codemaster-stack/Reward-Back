const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    accountType:{
        type:String,
        enum:["guest","registered","admin"],
        default:"guest"
    },

    guestId:{
        type:String,
        unique:true,
        sparse:true
    },

    fullName:{
        type:String,
        default:null
    },

    email:{
        type:String,
        default:null,
        lowercase:true
    },

    phone:{
        type:String,
        default:null
    },

    password:{
        type:String,
        default:null
    },

    country:{
        type:String,
        default:"Nigeria"
    },

    currency:{
        type:String,
        default:"NGN"
    },

    coinBalance:{
        type:Number,
        default:0
    },

    cashBalance:{
        type:Number,
        default:0
    },

    totalEarnedCoins:{
        type:Number,
        default:0
    },

    totalWithdrawn:{
        type:Number,
        default:0
    },

    withdrawalEligible:{
        type:Boolean,
        default:false
    },

    status:{
        type:String,
        enum:["Active","Suspended"],
        default:"Active"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);