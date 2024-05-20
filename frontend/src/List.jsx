import ListItem from "./ListItem";

const List = ({ tasks, deleteTask, completeTask, editTask }) => {
  if (!tasks || !tasks.length) {
    return null;
  }

  return tasks.map((task) => (
    <ListItem
      key={task._id}
      task={task}
      deleteTask={deleteTask}
      onCompleteTask={completeTask}
      onTaskChange={editTask}
    />
  ));
};

export default List;
