import { useMemo, useState } from "react";
import classNames from "classnames";
import ToDoForm from "./ToDoForm";
import List from "./List";
import storage from "./storage";
// import UpcomingTasks from "./UpcomingTasks";

const FILTER = {
  todo: "todo",
  completed: "completed",
  upcoming: "upcoming",
};

const ToDoList = () => {
  const [tasks, setTasks] = useState(() => {
    return storage.getAll();
  });

  const [activeFilter, setFilter] = useState(FILTER.todo);

  const addTasks = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    storage.saveList(updatedTasks);
    return updatedTasks;
  };

  const filteredTasks = useMemo(
    () => storage.filterTasks(activeFilter, tasks),
    [activeFilter, tasks]
  );

  // const filteredUpcomingTasks = useMemo(
  //   () => storage.filterUpcomingTasks(tasks),
  //   [tasks]
  // );

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
    let index = -1;
    tasks.find((task, i) => {
      if (task.id === editedTask.id) {
        index = i;
        return true;
      }
      return false;
    });
    const newTasks = [...tasks];
    if (index !== -1) {
      newTasks[index] = editedTask;
    }

    setTasks(newTasks);
    storage.saveList(newTasks);
  };

  return (
    <div>
      <ToDoForm addTasks={addTasks} />
      <div className="toggle-container">
        <h3
          className={classNames({ active: activeFilter === FILTER.todo })}
          onClick={() => {
            setFilter(FILTER.todo);
          }}
        >
          ToDo
        </h3>
        <div className="divider"></div>
        <h3
          className={classNames({ active: activeFilter === FILTER.completed })}
          onClick={() => {
            setFilter(FILTER.completed);
          }}
        >
          All Completed
        </h3>
        <div className="divider"></div>
        <h3
          className={classNames({ active: activeFilter === FILTER.upcoming })}
          onClick={() => {
            setFilter(FILTER.upcoming);
          }}
        >
          Upcoming
        </h3>
      </div>
      {/* {activeFilter === FILTER.upcoming && (
        <List
          tasks={filteredTasks}
          // deleteTask={onTaskDeleted}
          // completeTask={onTaskCompleted}
          // editTask={onEditTask}
        />
      )} */}
      {(activeFilter === FILTER.todo || activeFilter === FILTER.completed) && (
        <List
          tasks={filteredTasks}
          deleteTask={onTaskDeleted}
          completeTask={onTaskCompleted}
          editTask={onEditTask}
        />
      )}
    </div>
  );
};

export default ToDoList;
