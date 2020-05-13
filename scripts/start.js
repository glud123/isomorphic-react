/**
 * 开发环境
 *
 */
const spawn = require("cross-spawn");
const YAML = require("yamljs");
const { logger, freePort } = require("./util");
const { serverSidePort } = YAML.load("config.yml");
logger("🍺 Node server starting...");

// 前端代码 构建服务进程
const clientCodeWatchProcess = spawn("npm", ["run", "client:watch"], {
  stdio: "inherit",
});

// 服务端代码 构建服务进程
const serverCodeWatchProcess = spawn("npm", ["run", "server:watch"], {
  // stdio: "inherit",
});

// node 服务进程
let nodeServerProcess = null;

// 启动 node 服务
const startNodeServer = () => {
  // 启动 node 服务前需要先释放掉占用的服务端的端口
  freePort(serverSidePort);
  // 启动构建好的 服务端代码
  nodeServerProcess = spawn("node", ["dist/server/app.js"], {
    stdio: "inherit",
  });
};

// 关闭子进程
const killChildProcess = () => {
  nodeServerProcess && nodeServerProcess.kill();
  clientCodeWatchProcess && clientCodeWatchProcess.kill();
  serverCodeWatchProcess && serverCodeWatchProcess.kill();
};

// 监听服务端代码构建完成时输出日志，启动 node 服务
serverCodeWatchProcess.stdout.on("data", function (data) {
  let str = data.toString();
  // webpack 构建 server 代码是否完成标识
  if (str.indexOf("___SEVERCODECOMPLETED___") > -1) {
    startNodeServer();
  } else {
    logger(str);
  }
});

// 主进程关闭 -> 关闭子进程
process.on("close", (code) => {
  logger(`❌ main process close ${code} !`);
  killChildProcess();
});

// 主线程退出 -> 关闭子进程
process.on("exit", (code) => {
  logger(`❌ main process exit ${code} !`);
});

// 非正常退出 -> 关闭子进程
process.on("SIGINT", (type, data) => {
  killChildProcess();
});
