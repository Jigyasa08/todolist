const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Define routes
router.get("/", async (req, res, next) => {
  const taskList = await Task.find({});
  res.json(taskList);
});

router.post("/", (req, res, next) => {
  // TODO...
  // get task object and create a new record for task and return new task object
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
