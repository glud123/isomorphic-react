const chalk = require("chalk");
const path = require("path");
const open = require("open");
const spawn = require("cross-spawn");

// 路径转换
const resolvePath = (pathStr) => {
  return path.resolve(__dirname, `../${pathStr}`);
};

// 控制台彩色输出
const logger = (str, type = "yellow") => {
  console.log(chalk[type](str));
};

// 打开浏览器
async function openBrowser(url) {
  await open(url, { app: ["google chrome", "--incognito"] });
}
// 端口释放
const freePort = (port, appPath) => {
  let lsofOutStr = spawn.sync("lsof", ["-i", `:${port}`]).stdout.toString();
  if (lsofOutStr) {
    logger(`\n🚫 free port ${port}`, "red");
    lsofOutStr.split("\n").map((line) => {
      let p = line.trim().split(/\s+/);
      let address = p[1];
      if (address && address != "PID") {
        let killerOutStr = spawn
          .sync("kill", ["-9", address])
          .stdout.toString();
        if (!killerOutStr && appPath) {
          require(appPath);
        }
      }
    });
  } else {
    if (appPath) {
      require(appPath);
    }
  }
};

module.exports = {
  resolvePath: resolvePath,
  logger: logger,
  openBrowser: openBrowser,
  freePort: freePort,
};
