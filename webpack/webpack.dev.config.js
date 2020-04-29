const path = require("path");
const webpack = require("webpack");
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
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 8,
    }),
  ],
};
