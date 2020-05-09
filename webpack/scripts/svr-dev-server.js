// 开发环境 node 服务入口
const proConfig = require("./../../src/common/pro-config.js");
const freePort = require("./free-port.js");

// // node server port
const serverPort = proConfig.nodeServerPort;

// // 启动服务前 检查端口是否被占用，如果占用会将
freePort(serverPort, "../../dist/server/app");
