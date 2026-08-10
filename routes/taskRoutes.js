const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById
} = require("../controllers/taskController");

router.post("/", createTask);

router.get("/", getTasks);

router.get("/:taskId", getTaskById);





module.exports = router;