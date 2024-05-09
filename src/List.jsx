import ListItem from "./ListItem";

const List = ({
  tasks,
  deleteTask,
  completeTask,
  editTask,
  onDateChange,
  selectedDate,
}) => {
  if (!tasks || !tasks.length) {
    return null;
  }

  return tasks.map((task) => (
    <ListItem
      key={task.id}
      task={task}
      deleteTask={deleteTask}
      onCompleteTask={completeTask}
      onTaskChange={editTask}
      selectedDate={selectedDate}
      onDateChange={onDateChange}
    />
  ));
};

export default List;
