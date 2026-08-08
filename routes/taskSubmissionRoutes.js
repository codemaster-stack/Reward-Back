const express = require("express");

const router = express.Router();

const {
  createSubmission,
  approveSubmission,
  rejectSubmission,
} = require("../controllers/taskSubmissionController");


// Create submission
router.post("/", createSubmission);


// Approve submission
router.put("/:id/approve", approveSubmission);


// Reject submission
router.put("/:id/reject", rejectSubmission);


module.exports = router;