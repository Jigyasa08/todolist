const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  completedDate: { type: Date },
});

module.exports = mongoose.model("Task", taskSchema);
