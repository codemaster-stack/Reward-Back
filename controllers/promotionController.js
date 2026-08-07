const Promotion = require("../models/Promotion");

// GET ALL PROMOTIONS
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();

    res.status(200).json({
      success: true,
      count: promotions.length,
      data: promotions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE PROMOTION
exports.createPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.create(req.body);

    res.status(201).json({
      success: true,
      data: promotion,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};