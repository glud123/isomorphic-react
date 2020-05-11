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
  const lsofWatcher = spawn("lsof", ["-i", `:${port}`]);
  lsofWatcher.on("close", (code) => {
    if (typeof code === "number" && appPath) {
      require(appPath);
    }
  });
  lsofWatcher.stdout.on("data", (data) => {
    let dataStr = data.toString();
    logger(`💣 FreePort ${port}`, "red");
    dataStr.split("\n").map((line) => {
      let p = line.trim().split(/\s+/);
      let address = p[1];
      if (address && address != "PID") {
        const killWatcher = spawn("kill", ["-9", address]);
        killWatcher.on("close", (code) => {
          logger(`💣 FreePort ${port}`, "red");
          if (typeof code === "number" && appPath) {
            require(appPath);
          }
        });
      }
    });
  });
};

module.exports = {
  resolvePath: resolvePath,
  logger: logger,
  openBrowser: openBrowser,
  freePort: freePort,
};
