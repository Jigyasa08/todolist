import { useState } from "react";

const ListItem = ({ task, deleteTask, onCompleteTask, onTaskChange }) => {
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
      <span>
        {editMode ? (
          <input
            type="text"
            value={task.task}
            onChange={handleEdit}
            onBlur={handleSaveButtonClick}
            autoFocus
          />
        ) : (
          <span className="text" onDoubleClick={() => setEditMode(true)}>
            {task.task}
          </span>
        )}

        <button className="delete-button" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </span>
    </div>
  );
};

export default ListItem;
