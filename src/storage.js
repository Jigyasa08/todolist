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

  filterTasks(isCompleted, tasks) {
    if (!tasks || !tasks.length) return [];

    return tasks.filter((taskItem) => {
      return taskItem.completed === isCompleted;
    });
  }
}

export default new Storage();
