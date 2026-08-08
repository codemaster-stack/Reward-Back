const User = require("../models/User");
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