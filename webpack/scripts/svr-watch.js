const webpack = require("webpack");
const config = require("./../webpack.server.config.js");
const constantCode = require("./constant.js");

config.mode = "development";

const compiler = webpack(config);

const wathcing = compiler.watch(
  {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 2000,
  },
  (err, stats) => {
    let statsJson = stats.toJson("minimal");
    if (statsJson.errors) {
      statsJson.errors.forEach((errStats) => {
        console.log("XXXXXXXXXXXXX", errStats);
      });
    }
    if (statsJson.warnings) {
      statsJson.warnings.forEach((warStats) => {
        console.log("??????????????", warStats);
      });
    }
    //定一个常量，编译完成后 通知主进程来重启node 服务，主进程通过此标志来进行判断是否重启
    console.log(constantCode.SVRCODECOMPLETED);
  }
);

compiler.hooks.done.tap("done", (data) => {
  console.log("\n server code is done!");
});

// 收到退出信号后，退出当前进程
process.stdin.on("data", (data) => {
  if (data.toString() === "exit") {
    process.exit();
  }
});
