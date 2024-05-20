import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import ToDoForm from "./ToDoForm";
import List from "./List";
import storage from "./storage";
import UpcomingTasks from "./UpcomingTasks";
import axios from "axios";

const FILTER = {
  todo: "todo",
  completed: "completed",
  upcoming: "upcoming",
};

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);

  const [activeFilter, setFilter] = useState(FILTER.todo);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTasks = async (newTask) => {
    try {
      const response = await axios.post("/api/tasks/", newTask);
      const addedTask = response.data;
      const updatedTasks = [...tasks, addedTask];
      setTasks(updatedTasks);
      console.log(addedTask);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = useMemo(
    () => storage.filterTasks(activeFilter, tasks),
    [activeFilter, tasks]
  );

  const filteredUpcomingTasks = useMemo(
    () => storage.filterUpcoming(tasks),
    [tasks]
  );

  const onTaskDeleted = async (taskId) => {
    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);

      if (response.status === 200) {
        setTasks((prevTasks) => {
          return prevTasks.filter((task) => task._id !== taskId);
        });
      } else {
        throw new Error("Error deleting task", response.statusText);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTaskAction = (updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === updatedTask._id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  const onTaskCompleted = async (completedTask) => {
    let updateTask = {};
    try {
      updateTask = { ...completedTask };
      updateTask.isCompleted = !completedTask.isCompleted;
      updateTask.completedDate = updateTask.isCompleted
        ? new Date().toISOString()
        : null;
      await onUpdateTask(updateTask);
    } catch (error) {
      console.error(error);
      if (updateTask._id) {
        // Revert state on error
        updateTaskAction({ updateTask, isCompleted: !updateTask.isCompleted });
      }
    }
  };

  const onUpdateTask = async (updatedTask) => {
    try {
      // Update task locally immediately...
      updateTaskAction(updatedTask);
      const response = await axios.patch(`/api/tasks/${updatedTask._id}`, {
        title: updatedTask.title,
        dueDate: updatedTask.dueDate,
        isCompleted: updatedTask.isCompleted,
      });
      console.log("updatetask", updatedTask);
      if (response.status === 200) {
        updateTaskAction(updatedTask);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error.message);
    }
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
          className={classNames({
            active: activeFilter === FILTER.completed,
          })}
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
      {activeFilter === FILTER.upcoming && (
        <UpcomingTasks
          tasks={filteredUpcomingTasks}
          deleteTask={onTaskDeleted}
          completeTask={onTaskCompleted}
          editTask={onUpdateTask}
        />
      )}
      {(activeFilter === FILTER.todo || activeFilter === FILTER.completed) && (
        <List
          tasks={filteredTasks}
          deleteTask={onTaskDeleted}
          completeTask={onTaskCompleted}
          editTask={onUpdateTask}
        />
      )}
    </div>
  );
};

export default ToDoList;
