const TaskSubmission = require("../models/TaskSubmission");
const Transaction = require("../models/transactionModel");


exports.createSubmission = async (req, res) => {
  try {
    const submission = await TaskSubmission.create(req.body);

    res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted this task.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const Task = require("../models/Task");
const User = require("../models/User");

// Create Submission
exports.createSubmission = async (req, res) => {
  try {
    const submission = await TaskSubmission.create(req.body);

    res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted this task.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Approve Submission
exports.approveSubmission = async (req, res) => {
  try {
    const submission = await TaskSubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    // Prevent approving an already reviewed submission
    if (submission.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Submission has already been ${submission.status.toLowerCase()}.`,
      });
    }

    // Find the task
    const task = await Task.findById(submission.task);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Find the user
    const user = await User.findById(submission.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get reward directly from the Task
    const rewardCoins = task.rewardCoins;

    // Add coins to user
    user.coinBalance += rewardCoins;
    user.totalEarnedCoins += rewardCoins;

    await user.save();

    await Transaction.create({

    user: user._id,

    type: "Earning",

    amount: rewardCoins,

    description:
        `${task.platform} ${task.action}`,

    reference: submission._id,

    status: "Completed"

});

    // Update submission
    submission.status = "Approved";
    submission.reviewedBy = "Admin";
    submission.reviewedAt = new Date();

    await submission.save();

    res.status(200).json({
      success: true,
      message: "Submission approved and coins awarded.",
      rewardCoins,
      submission,
      user: {
        id: user._id,
        coinBalance: user.coinBalance,
        totalEarnedCoins: user.totalEarnedCoins,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Reject Submission
exports.rejectSubmission = async (req, res) => {
  try {
    const submission = await TaskSubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    // Only Pending submissions can be rejected
    if (submission.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Submission has already been ${submission.status.toLowerCase()}.`,
      });
    }

    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required.",
      });
    }

    submission.status = "Rejected";
    submission.reviewedBy = "Admin";
    submission.reviewedAt = new Date();
    submission.rejectionReason = rejectionReason;

    await submission.save();

    res.status(200).json({
      success: true,
      message: "Submission rejected.",
      submission,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


