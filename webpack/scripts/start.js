const spawn = require("cross-spawn");
const constantCode = require("./constant.js");
const { nodeServerPort } = require("../../src/share/pro-config.js");
const { logger } = require("./util.js");

logger("node server starting ...");

// 前端代码 构建服务进程
const feCodeWatchProcess = spawn("npm", ["run", "wds:watch"]);

// 服务端代码 构建服务进程
const svrCodeWatchProcess = spawn("npm", ["run", "svr:watch"]);

// node 服务进程
let nodeSvrProcess = null;

// 启动 node 服务
const startNodeServer = () => {
  nodeSvrProcess = spawn(
    "node",
    ["./webpack/scripts/svr-dev-server.js", nodeServerPort],
    {
      stdio: "inherit",
    }
  );
};

// 控制台日志输出
const logPrint = (data) => {
  let logStr = data.toString();
  if (logStr.indexOf(constantCode.SVRCODECOMPLETED) === 0) {
    // 当接收到服务端代码编译完成通知时，重启 node 服务
    startNodeServer();
  } else {
    logger(`${logStr}`);
  }
};

// 监听 服务器端代码构建服务的输出日志
svrCodeWatchProcess.stdout.on("data", logPrint);

// 关闭子进程
const killChildProcess = () => {
  nodeSvrProcess && nodeSvrProcess.kill();
  feCodeWatchProcess && feCodeWatchProcess.kill();
  svrCodeWatchProcess && svrCodeWatchProcess.kill();
};

// 主线程关闭关闭子线程
process.on("close", (code) => {
  logger(`main process  close ${code}`);
  killChildProcess();
});

// 主线程退出关闭子线程
process.on("exit", (code) => {
  logger(`main process exit ${code}`);
});

// 非正常退出
process.on("SIGINT", (type, data) => {
  killChildProcess();
});
