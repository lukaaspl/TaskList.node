const log = require("./log");
const fs = require("fs");
const getTaskId = require("./getTaskId");
const updateList = require("./updateList");

// temporary variable waiting for json result
let tasksJSON;

// get tasks from json file
try {
  const tasksBuffer = fs.readFileSync("./tasks.json");
  tasksJSON = JSON.parse(tasksBuffer);
} catch (error) {
  return log.error(`Couldn't get tasks file: ${error}`);
}

// process entered parameters
const processData = (parameter, content, important) => {
  let action = parameter.toString().toLowerCase();

  // handle shortened parameters
  if (action === "a") action = "add";
  else if (action === "r") action = "remove";
  else if (action === "l") action = "list";

  // catch action type
  switch (action) {
    // add new todo item to list
    case "add":
      if (typeof content !== "string" || content.length < 2)
        return log.error(
          "Zadanie musi być tekstem oraz musi zawierać co najmniej 2 znaki!"
        );

      // check if task is unique
      if (getTaskId(tasksJSON, content))
        return log.error("Takie zadanie już istnieje!");

      // generate unqiue id
      const id = tasksJSON[tasksJSON.length - 1].id + 1;

      // and date
      const date = new Date().toLocaleString();

      // add record to temporary array
      tasksJSON.push({
        id,
        content,
        important,
        date
      });

      // update file with list and return message
      updateList(
        JSON.stringify(tasksJSON),
        "Nie udało się zapisać zadania!",
        "Zadanie zostało dodane pomyślnie!"
      );
      break;

    case "remove":
      if (typeof content !== "string" || content.length < 2)
        return log.error(
          "Zadanie musi być tekstem oraz musi zawierać co najmniej 2 znaki!"
        );

      // check if task to delete exists
      if (!getTaskId(tasksJSON, content))
        return log.error("Zadanie, które chcesz usunąć nie istnieje!");

      // remove choosen task
      tasksJSON = tasksJSON.filter(task => {
        if (task.content !== content) return true;
        return false;
      });

      // update file with list and return message
      updateList(
        JSON.stringify(tasksJSON),
        "Nie udało się usunąć zadania!",
        "Zadanie zostało usunięte pomyślnie!"
      );
      break;

    // show list
    case "list":
      tasksJSON.forEach((task, index) => {
        const { id, important, date } = task;
        let content = important
          ? `PRIORITY! ${task.content}`.bold.underline
          : task.content;

        const result = `${index + 1}. ${content} (id: ${id}) - ${date}`;
        if (index % 2) return log.odd(result);
        else return log.even(result);
      });
      break;
    default:
      log.error("Nieprawidłowy parametr!");
  }
};

module.exports = processData;
