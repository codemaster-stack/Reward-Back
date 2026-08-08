const express = require("express");

const router = express.Router();

const {

createGuest

}=require("../controllers/userController");

router.post("/guest",createGuest);

module.exports=router;