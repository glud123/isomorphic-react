const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const { smart } = require("webpack-merge");
// webpack 清理构建目录插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// css 提取插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩优化 css 插件
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
// JS 压缩插件
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
// 前端资源文件映射表
const ManifestPlugin = require("webpack-manifest-plugin");
const YAML = require("yamljs");
const commonConfig = require("./webpack.common");
const { resolvePath, freePort, openBrowser, logger } = require("../util");

logger(`🍎 Client ${process.env.NODE_ENV}`);
const { NODE_ENV } = process.env;

const { clientSidePort, serverSidePort } = YAML.load("config.yml");

/**
 * webpack 基础配置
 * 包括:
 * 1.前端代码开发和生产共用的部分
 * 2.开发配置部分
 * 3.开发 webpack-dev-server 配置部分
 * 4.生产配置部分
 */

// server code webpack common config
let webpackCommonConfig = {
  entry: resolvePath("src/client/app.js"),
  output: {
    filename: "js/[name].js",
    path: resolvePath("dist/static"),
  },
  resolve: {
    alias: {
      // 定义别名，方便导入
      "@assets": resolvePath("src/client/assets/"),
      // 使用 @hot-loader/react-dom 库代替 react-dom （为满足 React 热重载）
      "react-dom": "@hot-loader/react-dom",
    },
  },
};

// webpack 开发环境配置信息
let webpackDevConfig = {
  mode: "development",
  output: {
    publicPath: `//localhost:${clientSidePort}/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "react-hot-export-loader", // 自动插入 react-hot-loader 实现对源码不需要修改就能实现 react 热更新
            options: {
              plugins: ["classProperties"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css", //设置名称
    }),
  ],
};

// webpack-dev-server config
let devServerConfig = {
  quiet: true,
  port: clientSidePort, //前端服务端口
  contentBase: resolvePath("dist/static"),
  publicPath: `//localhost:${clientSidePort}/`, //必须和 webpack.dev.cnofig保持一致
  hot: true,
  progress: true,
  open: false,
  compress: true,
  watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/,
    //这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。当第一个文件更改，会在重新构建前增加延迟。以毫秒为单位：
    aggregateTimeout: 300,
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

// webpack 生产环境配置信息
let webpackProdConfig = {
  mode: "production",
  output: {
    publicPath: `/`,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
    new ManifestPlugin({
      filename: "@dist/server/assets/manifest.json",
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          warnings: false,
          ie8: true,
          output: {
            comments: false,
          },
        },
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /node_modules/, // 指定 ndoe_modules 下的第三方包
          chunks: "initial",
          name: "libs", // 打包后的文件名
        },
      },
    },
  },
};

/**
 * 根据脚本传参不同客户端采用不同的webpack配置
 * 分为:
 * 生产环境 NODE_ENV = "development"
 * 开发环境 NODE_ENV = "production"
 * 默认 生产环境
 */
if (NODE_ENV === "production") {
  // 生产环境
  module.exports = smart(commonConfig, webpackCommonConfig, webpackProdConfig);
} else {
  /**
   * 开发环境
   * 通过 webpack-dev-server 进行前端热重载，并启动前端开发服务，为 node 服务提供静态页面，
   * 代码构建完成自动打开浏览器并打开 node 服务端口地址
   */
  let devConfig = smart(commonConfig, webpackCommonConfig, webpackDevConfig);
  // 浏览器打开标识
  let browserIsOpen = false;
  // 创建前端开发服务
  const createWebpackDevServer = () => {
    let compiler = webpack(devConfig);
    compiler.hooks.done.tap("done", (data) => {
      logger("\n🍎 Client code is done!");
      if (!browserIsOpen) {
        browserIsOpen = true;
        // 开发者访问的页面应为 node 服务，而不是前端服务
        openBrowser(`http://localhost:${serverSidePort}`);
      }
    });
    return new webpackDevServer(compiler, devServerConfig);
  };
  // 释放 webpack-dev-server 服务端口
  freePort(clientSidePort);
  // 运行前端开发服务
  createWebpackDevServer().listen(clientSidePort, (err) => {
    if (err) {
      return console.log(err);
    }
  });
}
