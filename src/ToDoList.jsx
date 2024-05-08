import { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["apple", "banana"]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    setTasks((task) => [...task, newTask]);
    setNewTask("");
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, id) => id !== index);
    setTasks(updatedTasks);
  }

  return (
    <>
      <div>
        <input type="text" value={newTask} onChange={handleInputChange} />
        <button onClick={addTask}>ADD</button>
      </div>
      <div>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default ToDoList;
