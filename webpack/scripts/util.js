const chalk = require("chalk"); // 控制台彩色输出

const logger = (str, type) => {
  console.log(chalk.green(">>>"), chalk.yellow(str));
};
module.exports = {
  logger: logger,
};
