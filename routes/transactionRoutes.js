const express = require("express");

const router = express.Router();

const {
    getUserTransactions
} = require("../controllers/transactionController");


router.get(
    "/user/:userId",
    getUserTransactions
);


module.exports = router;