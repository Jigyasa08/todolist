const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Define routes
router.get("/", async (req, res) => {
  const taskList = await Task.find({});
  res.json(taskList);
});

router.post("/", async (req, res) => {
  // get task object and create a new record for task and return new task object
  const newTaskData = req.body;
  // ADD VALIDATION
  // Save to mongo
  const task = new Task({ ...newTaskData, isCompleted: false });
  await task.save();
  res.json(task);
});

router.patch("/:taskId", async (req, res, next) => {
  // TODO...// ADD VALIDATION
  // find by task and update task and return new task object
  const taskId = req.params.taskId;
  const updatedTaskData = req.body;
  const updatedTask = await Task.findById(taskId);

  if (!updatedTask) {
    // TODO return error ... invalid data..
    return res.status(400).json({ error: "Error! Invalid task Id" });
  }

  if (updatedTaskData && updatedTaskData.title) {
    updatedTask.title = updatedTaskData.title;
  }

  if (updatedTaskData && updatedTaskData.title) {
    updatedTask.title = updatedTaskData.title;
  }

  if (updatedTaskData?.dueDate) {
    updatedTask.dueDate = updatedTaskData.dueDate;
  }

  if (updatedTaskData?.isCompleted !== undefined) {
    if (!updatedTask.isCompleted && updatedTaskData.isCompleted) {
      // Update the completed date
      updatedTask.completedDate = new Date();
    }
    updatedTask.isCompleted = updatedTaskData.isCompleted;
  }

  await updatedTask.save();
  res.json(updatedTask);
});

router.delete("/:taskId", (req, res, next) => {
  // TODO...
  // delete mongo and return status
});

module.exports = router;
