const FILTER = {
  todo: "todo",
  completed: "completed",
  upcoming: "upcoming",
};

class Storage {
  key = "todoTasks";
  parse(data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON", error);
    }
    return null;
  }

  toString(data) {
    try {
      const dataStr = JSON.stringify(data);
      return dataStr;
    } catch (error) {
      console.error("Error parsing JSON", error);
    }
    return "";
  }

  saveList(list) {
    localStorage.setItem(this.key, this.toString(list));
    return list;
  }

  getAll() {
    const list = this.parse(localStorage.getItem(this.key));
    return list ? list : [];
  }

  filterTasks(activeFilter, tasks) {
    if (!tasks || !tasks.length) return [];

    return tasks.filter((taskItem) => {
      if (activeFilter === FILTER.completed) {
        return taskItem.completed;
      }
      return !taskItem.completed;
    });
  }

  // filterUpcomingTasks(tasks) {
  //   if (!tasks || !tasks.length) return [];

  //   const today = new Date();
  //   const tomorrow = new Date(today);
  //   tomorrow.setDate(today.getDate() + 1);

  //   return tasks.filter((taskItem) => {
  //     const taskDate = new Date(taskItem.dueDate);
  //     return taskDate >= today && taskDate < tomorrow;
  //   });
  // }
}

const storage = new Storage();
export default storage;
