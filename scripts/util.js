const chalk = require("chalk");
const path = require("path");

// 路径转换
const resolvePath = (pathStr) => {
  return path.resolve(__dirname, pathStr);
};

// 控制台彩色输出
const logger = (str, type = "yellow") => {
  console.log(chalk[type](str));
};

module.exports = {
  resolvePath: resolvePath,
  logger: logger,
};
