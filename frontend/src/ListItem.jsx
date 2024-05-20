import { useState } from "react";
import Datepicker from "./Datepicker";
import { format } from "date-fns";
// import storage from "./storage";

const ListItem = ({ task, deleteTask, onCompleteTask, onTaskChange }) => {
  const [currentEditTask, setcurrentEditTaskTask] = useState(null);

  const closeEditMode = () => {
    setcurrentEditTaskTask(null);
  };

  const handleEdit = (event) => {
    const editedTask = { ...task };
    editedTask.title = event.target.value;
    setcurrentEditTaskTask({ ...editedTask });
  };

  const handleCheck = (e) => {
    onCompleteTask(task);
  };

  const handleSaveButtonClick = () => {
    onTaskChange({ ...currentEditTask });
    closeEditMode();
  };

  const formattedDueDate = format(task.dueDate, "MM/dd/yyyy");
  const formattedCompletedDate = task.completedDate
    ? format(task.completedDate, "MM/dd/yyyy")
    : "";

  // const upcomingTasks = storage.filterUpcoming(task);

  return (
    <div className="list-item">
      {!task.isCompleted ? (
        currentEditTask ? (
          <div className="flex">
            <div className="input">
              <div>
                <div className="title">Task</div>
                <input
                  type="text"
                  value={currentEditTask.title}
                  onChange={handleEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveButtonClick();
                  }}
                />
              </div>
              <div>
                <div className="title">Due Date</div>
                <Datepicker
                  task={currentEditTask}
                  onDateChange={setcurrentEditTaskTask}
                />
              </div>
            </div>

            <div className="buttons">
              <button className="delete-button" onClick={closeEditMode}>
                Cancel
              </button>
              <button className="edit-button" onClick={handleSaveButtonClick}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div>
              <input
                checked={task.isCompleted}
                type="checkbox"
                className="checkbox"
                onChange={handleCheck}
              />
              <span
                className="text"
                onDoubleClick={() => setcurrentEditTaskTask(task)}
              >
                {task.title}
              </span>
              {/* <p className={alertCSS ? "alert" : "date"}> */}
              <p className="date">
                <span>Due Date:</span>
                <span>{formattedDueDate}</span>
              </p>
            </div>
            <div className="btns">
              <button
                className="edit-button"
                onClick={() => setcurrentEditTaskTask(task)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="flex">
          <div>
            <input
              checked={task.isCompleted}
              type="checkbox"
              className="checkbox"
              onChange={handleCheck}
            />
            <span className="text">{task.title}</span>
            <p className="date">
              <span>Completed Date:</span>
              <span>{formattedCompletedDate}</span>
            </p>
          </div>
          <div className="btns">
            <button
              className="delete-button"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItem;
