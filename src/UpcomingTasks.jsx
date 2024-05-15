import ListItem from "./ListItem";

const UpcomingTasks = ({
  tasks,
  deleteTask,
  completeTask,
  editTask,
  onDateChange,
  selectedDate,
}) => {
  return (
    <>
      {tasks.today.length > 0 && (
        <div>
          <h2>Today</h2>
          {tasks.today.map((task) => (
            <ListItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              onCompleteTask={completeTask}
              onTaskChange={editTask}
              selectedDate={selectedDate}
              onDateChange={onDateChange}
            />
          ))}
        </div>
      )}
      {tasks.tomorrow.length > 0 && (
        <div>
          <h2>Tomorrow</h2>
          {tasks.tomorrow.map((task) => (
            <ListItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              onCompleteTask={completeTask}
              onTaskChange={editTask}
              selectedDate={selectedDate}
              onDateChange={onDateChange}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UpcomingTasks;
