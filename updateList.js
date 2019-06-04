const fs = require("fs");
const log = require("./log");

const updateList = (content, errorMessage, successMessage) => {
  fs.writeFile("./tasks.json", content, error => {
    if (error) return log.error(errorMessage);

    return log.success(successMessage);
  });
};

module.exports = updateList;
