/**
 * 开发环境
 *
 */
const spawn = require("cross-spawn");
const YAML = require("yamljs");
const Font = require("ascii-art-font");
const { logger, freePort } = require("./util");
const { serverSidePort } = YAML.load("config.yml");

Font.create("PISCES", "Doom",function(err,str){
  logger(str);
})

// node 服务进程
let nodeServerCP = null;

// 启动 node 服务
const startNodeServer = () => {
  // 启动 node 服务前需要先释放掉占用的服务端的端口
  freePort(serverSidePort);
  // 启动构建好的 服务端代码
  nodeServerCP = spawn("node", ["dist/server/app.js", serverSidePort], {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
    detached: false,
  });
};

// 前端代码 构建服务进程
const clientCodeWatchCP = spawn(
  "node",
  ["scripts/webpackConfig/webpack.client.config.js"],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
    detached: false,
  }
);

// 服务端代码 构建服务进程
const serverCodeWatchCP = spawn(
  "node",
  ["scripts/webpackConfig/webpack.server.config.js"],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["inherit", "inherit", "inherit", "ipc"],
    detached: false,
  }
);

// 监听服务端代码构建是否完成，完成则重启 node server
serverCodeWatchCP.on("message", function (data) {
  if (data.isCompleted) {
    logger(data.message, "green");
    startNodeServer();
  }
});

// 关闭子进程
const killChildProcess = () => {
  nodeServerCP && nodeServerCP.kill();
  clientCodeWatchCP && clientCodeWatchCP.kill();
  serverCodeWatchCP && serverCodeWatchCP.kill();
};

// 主进程关闭 -> 关闭子进程
process.on("close", (code) => {
  logger(`❌ main process close ${code} !`);
  killChildProcess();
});

// 主线程退出 -> 关闭子进程
process.on("exit", (code) => {
  logger(`❌ main process exit ${code} !`);
  killChildProcess();
});

// 非正常退出 -> 关闭子进程
process.on("SIGINT", (type, data) => {
  killChildProcess();
});
