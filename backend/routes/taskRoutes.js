const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Joi = require("joi");

const validationSchema = Joi.object().keys({
  title: Joi.string().required(),
  dueDate: Joi.date().iso(),
  isCompleted: Joi.boolean().sensitive(),
});

// Define routes
router.get("/", async (req, res) => {
  const taskList = await Task.find({});
  res.json(taskList);
});

router.post("/", async (req, res) => {
  // VALIDATION
  const { error, value } = validationSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      error: error,
    });
  }
  const newTaskData = value;
  // Save to mongo
  const task = new Task({ ...newTaskData, isCompleted: false });
  await task.save();
  res.json(task);
});

router.patch("/:taskId", async (req, res) => {
  // TODO...// ADD VALIDATION
  // find by task and update task and return new task object
  const taskId = req.params.taskId;
  const { error, value } = validationSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      error: error,
    });
  }
  const updatedTaskData = value;
  const updatedTask = await Task.findById(taskId);

  if (!updatedTask) {
    // TODO return error ... invalid data..
    return res.status(400).json({ error: "Error! Invalid task Id" });
  }

  if (updatedTaskData?.title) {
    updatedTask.title = updatedTaskData.title;
  }

  if (updatedTaskData?.dueDate) {
    updatedTask.dueDate = updatedTaskData.dueDate;
  }

  if (updatedTaskData?.isCompleted !== undefined) {
    if (!updatedTask.isCompleted && updatedTaskData.isCompleted) {
      // Update the completed date
      updatedTask.completedDate = new Date();
    } else {
      updatedTask.completedDate = undefined;
    }
    updatedTask.isCompleted = updatedTaskData.isCompleted;
  }

  updatedTask.updatedDate = Date.now();

  await updatedTask.save();
  res.json(updatedTask);
});

router.delete("/:taskId", async (req, res) => {
  // TODO...
  const taskId = req.params.taskId;
  // delete mongo and return status
  await Task.findByIdAndDelete(taskId);
  return res.json({
    status: "Success",
  });
});

module.exports = router;
