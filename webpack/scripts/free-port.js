const { exec } = require("child_process");
const {logger} =require("./util.js");
// 端口释放
module.exports = (port) => {
  if (process.platform && process.platform !== "win32") {
    // macOS linux
    const args = process.argv.slice(2);
    let portArg = args && args[0];
    if (portArg && portArg.indexOf("--") > 0) {
      port = portArg.split("--")[1];
    }
    let order = `lsof -i :${port}`;
    exec(order, (err, stdout, stderr) => {
      if (err) {
        if(err.signal != null){
          return console.log(err);
        }
        return;
      }
      stdout.split("\n").map((line) => {
        let p = line.trim().split(/\s+/);
        let address = p[1];
        if (address && address != "PID") {
          exec("kill -9 " + address, (err, stdout, stderr) => {
            if (err) {
              return logger(`端口 ${port} 释放失败`);
            }
            logger("port kill");
          });
        }
      });
    });
  }
};
