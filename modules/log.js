const colors = require("colors");

const log = {
  default: message => console.log(message),
  error: message => {
    console.log(message.white.bgRed);
    process.exit();
  },
  success: message => console.log(message.black.bgGreen),
  odd: message => console.log(message.magenta),
  even: message => console.log(message.cyan)
};

module.exports = log;
