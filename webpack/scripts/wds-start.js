const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const freePort = require("./free-port.js");
const openBrowser = require("./openBrowser.js");
const YAML = require("yamljs");
const clientConfig = require("./../webpack.dev.config.js");
const getWdsConfig = require("./webpack-dev-server.config.js");

const config = YAML.load("config.yml");

// 浏览器是否打开 标识
let browserIsOpen = false;

// webpack dev server 端口号
const WDS_PORT = config.wdsPort;

// node server 端口号
const NODE_SERVER_PORT = config.nodeServerPort;

const HOST = "localhost";

// 释放对应端口
freePort(WDS_PORT);

const createWebpackDevServer = (port) => {
  let compiler = webpack(clientConfig);
  compiler.hooks.done.tap("done", (data) => {
    console.log("\n wds server compile done");
    // 只有第一次编译完成时 打开浏览器
    if (!browserIsOpen) {
      browserIsOpen = true;
      openBrowser(`http://localhost:${NODE_SERVER_PORT}/`);
    }
  });
  return new webpackDevServer(compiler, getWdsConfig(port));
};

const runWebpackDevServer = () => {
  let devServer = createWebpackDevServer(WDS_PORT);
  devServer.listen(WDS_PORT, HOST, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(
      chalk.cyan("🚀 Starting the development node server,please wait....\n")
    );
  });
};

runWebpackDevServer();
