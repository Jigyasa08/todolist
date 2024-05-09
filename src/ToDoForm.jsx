import { useState } from "react";

function ToDoForm({ addTasks }) {
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      task: newTask,
      completed: false,
      dueDate: new Date(),
    };
    addTasks(task);
    setNewTask("");
  }

  return (
    <div>
      <input
        type="text"
        value={newTask}
        placeholder="Enter text here..."
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
      />
      <button className="add-button" onClick={addTask}>
        ADD
      </button>
    </div>
  );
}

export default ToDoForm;
