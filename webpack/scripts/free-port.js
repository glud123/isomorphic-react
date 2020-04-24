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
    let exec = require("child_process").exec;
    exec(order, (err, stdout, stderr) => {
      if (err) {
        return console.log(err);
      }
      stdout.split("\n").map((line) => {
        let p = line.trim().split(/\s+/);
        let address = p[1];
        if (address && address != "PID") {
          exec("kill -9 " + address, (err, stdout, stderr) => {
            if (err) {
              return console.log(`===> 端口 ${port} 释放失败!!!`);
            }
            console.log("===> Port Kill ~~~");
          });
        }
      });
    });
  }
};
