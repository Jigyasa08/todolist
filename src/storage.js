const FILTER = {
  todo: "todo",
  completed: "completed",
  upcoming: "upcoming",
};

class Storage {
  key = "todoTasks";

  formatDate(date) {
    // Get day, month, and year
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero based
    var year = date.getFullYear();

    // Pad day and month with leading zeros if needed
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    // Return formatted date
    return day + "-" + month + "-" + year;
  }

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

  filterUpcoming(tasks) {
    if (!tasks || !tasks.length) return [];

    const today = new Date();
    const todayDate = this.formatDate(today);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDate = this.formatDate(tomorrow);

    const todayTasks = [];
    const tomorrowTasks = [];

    tasks.forEach((task) => {
      const taskDueDate = this.formatDate(new Date(task.dueDate));
      if (!task.completed && taskDueDate === todayDate) {
        todayTasks.push(task);
      } else if (!task.completed && taskDueDate === tomorrowDate) {
        tomorrowTasks.push(task);
      }
    });

    return {
      today: todayTasks,
      tomorrow: tomorrowTasks,
    };
  }
}

const storage = new Storage();
export default storage;
