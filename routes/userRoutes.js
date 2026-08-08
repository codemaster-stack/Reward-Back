const express = require("express");

const router = express.Router();

const {
  createGuest,
  getUserWallet,
} = require("../controllers/userController");



router.post("/guest",createGuest);
router.get("/:userId/wallet", getUserWallet);


module.exports=router;