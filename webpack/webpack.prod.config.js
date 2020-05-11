const path = require("path");
const webpack = require("webpack");
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

// 路径转换
const resolvePath = (pathStr) => {
  return path.resolve(__dirname, pathStr);
};
// 指定 babel 配置
process.env.BABEL_ENV = "development";

module.exports = {
  mode: "production",
  devtool: "none",
  entry: {
    main: [resolvePath("./../src/client/app.js")],
  },
  output: {
    filename: "js/[name].[chunkhash:8].js", // 打包之后输出文件名
    path: resolvePath("./../dist/static"),
    publicPath: "/",
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
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/[name].[hash:8].[ext]", // 配置图片的输出路径和名称
              limit: 10000,
              publicPath: "/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
    new ManifestPlugin({
      filename: "@dist/server/assets/manifest.json",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
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
  resolve: {
    alias: {
      //定义dist 目录别名，方便导入模块
      "@assets": path.resolve(__dirname, "../src/client/assets/"),
    },
  },
};
