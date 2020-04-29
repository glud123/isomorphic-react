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
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 8,
    }),
  ],
};
