const path = require("path");
const webpack = require("webpack");
// css 提取插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 路径转换
const resolvePath = (pathStr) => {
  return path.resolve(__dirname, pathStr);
};

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: resolvePath("./../src/client/app.js"),
  output: {
    filename: "[name].js", // 打包之后输出文件名
    path: resolvePath("./../dist/static"),
    publicPath: "/",
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
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]", // 配置图片的输出路径和名称
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
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: '"development"' },
      __IS_PROD__: false,
      __SERVER__: false,
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          // 抽离第三方库
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: "initial",
          name: "libs", // 打包后的文件名，任意命名
        },
      },
    },
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};
