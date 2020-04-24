// 开发环境 node 服务入口
const proConfig = require("./../../src/share/pro-config.js");
// const freePort = require("./free-port.js");

// // node server port
const serverPort = proConfig.nodeServerPort;
// // 启动服务前 检查端口是否被占用，如果占用会将
// freePort(serverPort);

// require("./../../dist/server/app.js");

//启动前检查端口是否占用，杀掉占用端口的进程
require('./free-port.js')(serverPort);

require('../../dist/server/app');