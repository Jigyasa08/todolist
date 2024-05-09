import { useState } from "react";
import Datepicker from "./Datepicker";

const ListItem = ({
  task,
  deleteTask,
  onCompleteTask,
  onTaskChange,
  selectedDate,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (event) => {
    task.task = event.target.value;
    onTaskChange({ ...task });
  };

  const handleChange = (e) => {
    onCompleteTask(task);
  };

  const handleSaveButtonClick = () => {
    setEditMode(false);
  };

  return (
    <div className="list-item">
      <input
        checked={task.completed}
        type="checkbox"
        className="checkbox"
        onChange={handleChange}
      />
      <div>
        {editMode ? (
          <input
            type="text"
            value={task.task}
            onChange={handleEdit}
            onBlur={handleSaveButtonClick}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveButtonClick();
            }}
            autoFocus
          />
        ) : (
          <span className="text" onDoubleClick={() => setEditMode(true)}>
            {task.task}
          </span>
        )}
        <Datepicker
          task={task}
          selectedDate={selectedDate}
          onDateChange={onTaskChange}
        />
      </div>
      <button className="delete-button" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
};

export default ListItem;
