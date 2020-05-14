const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolvePath } = require("../util");
/**
 * webpack 默认配置文件
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
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
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]", // 配置图片的输出路径和名称
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __IS_PROD__: process.env.NODE_ENV === "production",
    }),
  ],
  resolve: {
    alias: {
      //定义dist 目录别名，方便导入模块
      "@client": resolvePath("src/client/"),
      "@server": resolvePath("src/server/"),
      "@common": resolvePath("src/common/"),
      "@assets": resolvePath("src/client/assets/"),
      "@dist": resolvePath("dist"),
      "react-dom": "@hot-loader/react-dom",
    },
  },
};
