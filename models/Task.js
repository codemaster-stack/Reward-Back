const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    promotion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Promotion",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    platform:{
        type:String,
        enum:[
            "Facebook",
            "Instagram",
            "X",
            "TikTok",
            "YouTube",
            "Telegram",
            "WhatsApp",
            "LinkedIn"
        ],
        required:true
    },

    action:{
        type:String,
        enum:[
            "Share",
            "Follow",
            "Like",
            "Comment",
            "Join",
            "Subscribe",
            "Visit"
        ],
        required:true
    },

    rewardCoins:{
        type:Number,
        required:true
    },

    targetLink:{
        type:String,
        required:true
    },

    proofType:{
        type:String,
        enum:[
            "Screenshot",
            "Post Link",
            "Both"
        ],
        default:"Both"
    },

    status:{
        type:String,
        enum:[
            "Active",
            "Paused"
        ],
        default:"Active"
    }

},{timestamps:true});

module.exports=mongoose.model("Task",taskSchema);