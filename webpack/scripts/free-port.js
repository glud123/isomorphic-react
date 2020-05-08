// const { exec } = require("child_process");
const spawn = require("cross-spawn");
// 端口释放
module.exports = (port, appPath) => {
  if (process.platform && process.platform !== "win32") {
    // macOS linux
    const lsofWatcher = spawn("lsof", ["-i", `:${port}`]);
    lsofWatcher.on("close", (code) => {
      if (typeof code === "number" && appPath) {
        require(appPath);
      }
    });
    lsofWatcher.stdout.on("data", (data) => {
      let dataStr = data.toString();
      dataStr.split("\n").map((line) => {
        let p = line.trim().split(/\s+/);
        let address = p[1];
        if (address && address != "PID") {
          const killWatcher = spawn("kill", ["-9", address]);
          killWatcher.on("close", (code) => {
            if (typeof code === "number" && appPath) {
              require(appPath);
            }
          });
        }
      });
    });
  }
};
