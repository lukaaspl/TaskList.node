const minimist = require("minimist");
const log = require("./modules/log");
const processData = require("./modules/processData");

// getting parameters
const argv = minimist(process.argv.slice(2));
delete argv._;

// set default parameters when user did not
let parameter = "list",
  important = false;

// if user set parameter assign it to variable and process
if (Object.keys(argv)[0]) parameter = Object.keys(argv)[0];

// when second parameter is set, check if task has to be important
if (
  Object.keys(argv)[1] &&
  (Object.keys(argv)[1].toLowerCase() === "important" ||
    Object.keys(argv)[1].toLowerCase() === "i")
)
  important = true;

// entered parameter value
const value = argv[parameter];

processData(parameter, value, important);
