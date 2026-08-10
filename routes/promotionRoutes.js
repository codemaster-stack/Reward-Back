const express = require("express");
const router = express.Router();

const {
  getPromotions,
  createPromotion,
  getPromotionById
} = require("../controllers/promotionController");
const { getTasksByPromotion } = require("../controllers/taskController");

router.get("/", getPromotions);

router.post("/", createPromotion);

router.get("/:promotionId/tasks", getTasksByPromotion);

router.get("/:promotionId", getPromotionById);


module.exports = router;