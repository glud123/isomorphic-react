const path = require("path");
const webpack = require("webpack");
// webpack 清理构建目录插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 路径转换
const resolvePath = (pathStr) => {
  return path.resolve(__dirname, pathStr);
};

process.env.BABEL_ENV = "node"; // 设置 babel 运行变量
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  target: "node",
  mode: "production",
  entry: resolvePath("./../src/server/app.js"),
  output: {
    filename: "app.js", // 打包之后输出文件名
    path: resolvePath("./../dist/server"),
  },
  externals: [nodeExternals()],
  resolve: {
    alias: {
      "@dist": resolvePath("../dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)?$/,
        use: {
          loader: "url-loader",
          options: {
            emitFile: false,
            name: "images/[name].[hash:8].[ext]",
            limit: 10000,
            publicPath: "/",
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __IS_PROD__: isProd,
      __SERVER__: true,
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    alias: {
      //定义dist 目录别名，方便导入模块
      "@dist": path.resolve(__dirname, "../dist"),
      "@assets": path.resolve(__dirname, "../src/client/assets/"),
    },
  },
};
