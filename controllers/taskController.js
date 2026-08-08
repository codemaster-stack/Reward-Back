const Task = require("../models/Task");
const Promotion = require("../models/Promotion");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("promotion");

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Tasks By Promotion
exports.getTasksByPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.promotionId);

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }

    const tasks = await Task.find({
      promotion: req.params.promotionId,
    });

    res.status(200).json({
      success: true,
      promotion,
      totalTasks: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};