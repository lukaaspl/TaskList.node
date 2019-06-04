const getTaskId = (tasks, content) => {
  for (let task of tasks) {
    if (task.content === content) return task.id;
  }
};

module.exports = getTaskId;
