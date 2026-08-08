const express = require("express");
const router = express.Router();

const {
  getPromotions,
  createPromotion,
} = require("../controllers/promotionController");
const { getTasksByPromotion } = require("../controllers/taskController");

router.get("/", getPromotions);

router.post("/", createPromotion);

router.get("/:promotionId/tasks", getTasksByPromotion);


module.exports = router;