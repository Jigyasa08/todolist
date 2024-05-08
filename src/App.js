import { useMemo, useState } from "react";
import ToDoForm from "./ToDoForm";
import List from "./List";
import storage from "./storage";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    return storage.getAll();
  });

  const [showCompletedList, setShowCompletedList] = useState(false);

  const addTasks = (newTask) => {
    const updatedTasks = setTasks([...tasks, newTask]);
    // setTasks((prevTasks) => {
    //   const updatedTasks = [...prevTasks, newTask];
    storage.saveList(updatedTasks);
    return updatedTasks;
    // });
  };

  const filteredTasks = useMemo(
    () => storage.filterTasks(showCompletedList, tasks),
    [showCompletedList, tasks]
  );

  const onTaskDeleted = (index) => {
    const updatedTasks = tasks.filter((task) => task.id !== index);
    setTasks(updatedTasks);
    localStorage.setItem("todoTasks", JSON.stringify(updatedTasks));
  };

  const onTaskCompleted = (completedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === completedTask.id) {
        task.completed = !task.completed;
      }
      return { ...task };
    });
    setTasks(updatedTasks);
    storage.saveList(updatedTasks);
  };

  const onEditTask = (editedTask) => {
    const updatedTask = tasks.find((task) => {
      if (task.id === editedTask.id) {
        return { ...task, task: editedTask.task };
      }
      return task;
    });
    setTasks(updatedTask);
    storage.saveList(updatedTask);
  };

  return (
    <div className="App">
      <h1>TO-DO LIST</h1>
      <ToDoForm addTasks={addTasks} />
      <div className="toggle-container">
        <h3
          className={showCompletedList ? "" : "active"}
          onClick={() => setShowCompletedList(false)}
        >
          ToDo
        </h3>
        <div className="divider"></div>
        <h3
          className={showCompletedList ? "active" : ""}
          onClick={() => setShowCompletedList(true)}
        >
          All Completed
        </h3>
      </div>
      <List
        tasks={filteredTasks}
        deleteTask={onTaskDeleted}
        completeTask={onTaskCompleted}
        editTask={onEditTask}
      />
    </div>
  );
}
