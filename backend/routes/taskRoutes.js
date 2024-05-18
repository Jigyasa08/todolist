const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Define routes
router.get("/", async (req, res) => {
  const taskList = await Task.find({});
  res.json(taskList);
});

router.post("/", async (req, res, next) => {
  // TODO...
  // get task object and create a new record for task and return new task object
  const newTaskData = req.body;
  // TODO: ADD VALIDATION
  // Save to mongo
  const task = new Task({ ...newTaskData, isCompleted: false });
  await task.save();
  res.json(task);
});

router.patch("/:taskId", (req, res, next) => {
  // TODO...
  // find by task and update task and return new task object
});

router.delete("/:taskId", (req, res, next) => {
  // TODO...
  // delete mongo and return status
});

module.exports = router;
