const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolvePath, __config } = require("../util");
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
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          // MiniCssExtractPlugin.loader,
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
      // 是否是生产环境
      __IS_PROD__: process.env.NODE_ENV === "production",
      // 是否是 ssr 服务端渲染
      __IS_SSR__: __config.mode === "ssr",
      // 是否是 csr 客户端渲染
      __IS_CSR__: __config.mode === "csr",
      // 是否是 同构模式
      __IS_ISO__: __config.mode === "isomorphic",
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  resolve: {
    alias: {
      //定义目录别名，方便导入模块
      "@client": resolvePath("src/client/"),
      "@server": resolvePath("src/server/"),
      "@common": resolvePath("src/common/"),
      "@redux": resolvePath("src/client/redux/"),
      "@assets": resolvePath("src/client/assets/"),
      "@dist": resolvePath("dist"),
      "react-dom": "@hot-loader/react-dom",
    },
  },
};
