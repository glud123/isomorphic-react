const path = require("path");

// 路径转换
const resolvePath = (pathStr) => {
  return path.resolve(__dirname, pathStr);
};

module.exports = {
  mode: "development",
  entry: resolvePath("./../src/client/app.js"),
  output: {
    filename: "index.js", // 打包之后输出文件名
    path: resolvePath("./../dist/static"),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
