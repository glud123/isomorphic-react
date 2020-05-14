const webpack = require("webpack");
const { smart } = require("webpack-merge");
const YAML = require("yamljs");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// webpack 清理构建目录插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const commonConfig = require("./webpack.common");
const { resolvePath } = require("../util");

const { NODE_ENV } = process.env;

process.env.BABEL_ENV = "node"; // 设置 babel 运行变量

const { clientSidePort } = YAML.load("config.yml");
/**
 * webpack 基础配置
 * 包括:
 * 1.前端代码开发和生产共用的部分
 * 2.开发配置部分
 * 3.生产配置部分
 */

// server code webpack common config
let webpackCommonConfig = {
  target: "node",
  entry: resolvePath("src/server/app.js"),
  output: {
    filename: "app.js",
    path: resolvePath("dist/server"),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
  resolve: {
    alias: {
      /// 定义别名，方便导入
      "@assets": resolvePath("src/client/assets/"),
      "@dist": resolvePath("dist"),
    },
  },
};

// webpack 开发环境配置信息
let webpackDevConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              publicPath: `//localhost:${clientSidePort}`,
            },
          },
        ],
      },
    ],
  },
};

// webpack 生产环境配置信息
let webpackProdConfig = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              publicPath: "/",
            },
          },
        ],
      },
    ],
  },
};

if (NODE_ENV === "production") {
  // 生产环境
  module.exports = smart(commonConfig, webpackCommonConfig, webpackProdConfig);
} else {
  let webpackConfig = smart(
    commonConfig,
    webpackCommonConfig,
    webpackDevConfig
  );
  // 开发环境
  let compiler = webpack(webpackConfig);
  compiler.watch(
    { aggregateTimeout: 300, ignored: /node_modules/ },
    (err, stats) => {
      let statsJson = stats.toJson("minimal");
      if (statsJson.errors) {
        statsJson.errors.forEach((errStats) => {
          console.log(errStats);
        });
      }
      if (statsJson.warnings) {
        statsJson.warnings.forEach((warStats) => {
          console.log(warStats);
        });
      }
    }
  );
  compiler.hooks.done.tap("done", (data) => {
    // 服务端代码构建完成标识
    process.send({ isCompleted: true, message: "\n🔥 server code is done!" });
  });
}
