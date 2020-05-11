const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
// 路径转换
const resolvePath = (pathStr) => {
  return path.resolve(__dirname, pathStr);
};

process.env.BABEL_ENV = "node"; // 设置 babel 运行变量
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  target: "node",
  mode: "development",
  entry: resolvePath("./../src/server/app.js"),
  output: {
    filename: "app.js", // 打包之后输出文件名
    path: resolvePath("./../dist/server"),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: ["css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              emitFile: false,
              name: "images/[name].[ext]", // 配置图片的输出路径和名称
              limit: 10000,
              publicPath: "//localhost:3004",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: `"${process.env.NODE_ENV}"` },
      __IS_PROD__: isProd,
      __SERVER__: true,
    }),
  ],
  resolve: {
    alias: {
      //定义dist 目录别名，方便导入模块
      "@assets": path.resolve(__dirname, "../src/client/assets/"),
    },
  },
};
