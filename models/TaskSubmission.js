const mongoose = require("mongoose");

const taskSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    promotion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion",
      required: true,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    proofLink: {
      type: String,
      default: null,
    },

    screenshot: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    reviewedBy: {
      type: String,
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate submissions
taskSubmissionSchema.index(
  {
    user: 1,
    task: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("TaskSubmission", taskSubmissionSchema);