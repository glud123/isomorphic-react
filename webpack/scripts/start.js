const { spawn } = require("child_process"); // 创建子进程
const constantCode = require("./constant.js");
const chalk = require("chalk"); // 控制台彩色输出

console.log(chalk.green("===> node server starting ..."));

// 前端代码 构建服务进程
const feCodeWatchProcess = spawn("npm", ["run", "fe:watch"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

// 服务端代码 构建服务进程
const svrCodeWatchProcess = spawn("npm", ["run", "svr:watch"], {
  shell: process.platform === "win32",
});

// node 服务进程
let nodeSvrProcess = null;

// 启动 node 服务
const startNodeServer = () => {
  nodeSvrProcess && nodeSvrProcess.kill();
  nodeSvrProcess = spawn("node", ["./webpack/scripts/svr-dev-server.js"], {
    shell: process.platform === "win32",
  });
  nodeSvrProcess.stdout.on("data", logPrint);
};

// 控制台日志输出
const logPrint = (data) => {
  let logStr = data.toString();
  if (logStr.indexOf(constantCode.SVRCODECOMPLETED)) {
    // 当接收到服务端代码编译完成通知时，重启 node 服务
    startNodeServer();
  } else {
    console.log(chalk.red(`===> LOG -> ${logStr}`));
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
  console.log(chalk.red(`===> main process  close ${code}`));
  killChildProcess();
});

// 主线程退出关闭子线程
process.on("exit", (code) => {
  console.log(chalk.red(`===> main process exit ${code}`));
});

// 非正常退出
process.on("SIGINT", () => {
  svrCodeWatchProcess.stdin &&
    svrCodeWatchProcess.stdin.write("exit", (error) => {
      console.log(chalk.red(`===> svr code watch process exit!!!`));
    });
  killChildProcess();
});
