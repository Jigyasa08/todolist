import { useState } from "react";
import Datepicker from "./Datepicker";
import { format } from "date-fns";
// import storage from "./storage";

const ListItem = ({ task, deleteTask, onCompleteTask, onTaskChange }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (event) => {
    task.task = event.target.value;
    onTaskChange({ ...task });
  };

  const handleCheck = (e) => {
    onCompleteTask(task);
  };

  const handleSaveButtonClick = () => {
    // onTaskChange({ ...task, task: task.task });
    setEditMode(false);
  };

  const formattedDueDate = format(task.dueDate, "MM/dd/yyyy");
  const formattedCompletedDate = task.completedDate
    ? format(task.completedDate, "MM/dd/yyyy")
    : "";

  // const upcomingTasks = storage.filterUpcoming(task);

  return (
    <div className="list-item">
      {!task.completed ? (
        editMode ? (
          <div className="flex">
            <div className="input">
              <div>
                <div className="title">Task</div>
                <input
                  type="text"
                  value={task.task}
                  onChange={handleEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveButtonClick();
                  }}
                />
              </div>
              <div>
                <div className="title">Due Date</div>
                <Datepicker task={task} onDateChange={onTaskChange} />
              </div>
            </div>

            <div className="buttons">
              <button
                className="delete-button"
                onClick={() => setEditMode(false)}
              >
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
                checked={task.completed}
                type="checkbox"
                className="checkbox"
                onChange={handleCheck}
              />
              <span className="text" onDoubleClick={() => setEditMode(true)}>
                {task.task}
              </span>
              {/* <p className={alertCSS ? "alert" : "date"}> */}
              <p className="date">
                <span>Due Date:</span>
                <span>{formattedDueDate}</span>
              </p>
            </div>
            <div className="btns">
              <button className="edit-button" onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
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
              checked={task.completed}
              type="checkbox"
              className="checkbox"
              onChange={handleCheck}
            />
            <span className="text">{task.task}</span>
            <p className="date">
              <span>Completed Date:</span>
              <span>{formattedCompletedDate}</span>
            </p>
          </div>
          <div className="btns">
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
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
