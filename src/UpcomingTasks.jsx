const UpcomingTasks = ({ tasks }) => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
    return taskDate === todayDate && !task.completed;
  });

  const tomorrowTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
    return taskDate === tomorrowDate && !task.completed;
  });

  return (
    <div>
      {todayTasks.length > 0 && (
        <div>
          <h2>Today</h2>
          {todayTasks.map((task) => (
            <div key={task.id}>
              <p>{task.task}</p>
              <p>Due Date: {task.dueDate}</p>
            </div>
          ))}
        </div>
      )}

      {tomorrowTasks.length > 0 && (
        <div>
          <h2>Tomorrow</h2>
          {tomorrowTasks.map((task) => (
            <div key={task.id}>
              <p>{task.task}</p>
              <p>Due Date: {task.dueDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;

// filterUpcomingTasks(tasks) {
//     if (!tasks || !tasks.length) return [];

//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const upcomingTasks = tasks.filter((taskItem) => {
//       const taskDate = new Date(taskItem.dueDate);
//       return taskDate >= today && taskDate < tomorrow;
//     });

//     const sortedUpcomingTasks = this.sortTasksByPriority(upcomingTasks);

//     return sortedUpcomingTasks;
//   }

//   sortTasksByPriority(tasks) {
//     const sortedTasks = tasks.sort(
//       (a, b) => this.priorityLevel(a) - this.priorityLevel(b)
//     );
//     return sortedTasks;
//   }

//   priorityLevel(task) {
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     if (task.dueDate === today.toISOString().split("T")[0]) {
//       return 0;
//     } else if (task.dueDate === tomorrow.toISOString().split("T")[0]) {
//       return 1;
//     } else {
//       return 2;
//     }
//   }

// sortTasksByPriority(tasks) {
//     // Sort tasks based on priority level
//     const sortedTasks = tasks.sort(
//       (a, b) => this.priorityLevel(a) - this.priorityLevel(b)
//     );
//     return sortedTasks;
//   }

//   priorityLevel(task) {
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     if (task.dueDate === today.toISOString().split("T")[0]) {
//       return 0; // Highest priority for tasks due today
//     } else if (task.dueDate === tomorrow.toISOString().split("T")[0]) {
//       return 1; // Second priority for tasks due tomorrow
//     } else {
//       return 2; // Lower priority for tasks due later
//     }
//   }

// const storage = new Storage();
// export default storage;
