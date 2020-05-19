# isomorphic-react

# 推荐作为学习 react 同构应用使用

## 运行

```zsh
npm run dev
```

## 构建

```zsh
npm run build
```

## 说明

`isomorphic-react` 为 `react` 同构项目

> 项目名暂定 `Gemini` （双子座 ♊），取自 react 同构应用，虽然前后端一套代码，但是每个端需要有一些单独设定的内容之意。

- 开发环境双服务 （client 采用 `webpack-dev-server` 服务，server 端 `node` 服务）
- 开发环境支持热更新
- 默认按需加载
- 数据安全（注水数据已经进行序列化）
- 引入`redux`
- 更多的精力关注业务代码...

## 基础依赖

| 依赖项  | 版本号   |
| ------- | -------- |
| node    | v12.16.2 |
| koa     | v2.11    |
| webpack | v4.43    |
| react   | v16.13.1 |

## 目录结构说明

```zsh
├── README.md
├── config.yml # 基础配置文件 (包括：client 端和 server 端端口号配置)
├── dist # 构建导出文件夹
│   └── server
│       └── app.js
├── favicon.ico
├── package-lock.json
├── package.json
├── postcss.config.js # postcss 配置文件
├── scripts # 脚本文件夹 (内含 client 端及 server 端 webpack 配置)
│   ├── start.js # npm run dev 脚本入口文件
│   ├── util.js
│   └── webpackConfig
│       ├── webpack.client.config.js # client 端 webpack 配置 （包括开发及生产环境）
│       ├── webpack.common.js # 公共 webpack 配置
│       └── webpack.server.config.js # client 端 webpack 配置 （包括开发及生产环境）
├── src # 项目开发文件
│   ├── client # client 端代码文件夹
│   │   ├── app.js # client 端入口文件
│   │   ├── assets # 静态资源
│   │   │   └── images
│   │   │       └── echarts.png
│   │   ├── components # client 端基础组件
│   │   │   └── LoadingComponent
│   │   │       └── index.js
│   │   ├── mock # mock 数据
│   │   │   └── homeData.js
│   │   ├── pages # 项目页面文件夹
│   │   │   ├── about # 测试页面
│   │   │   │   ├── index.js
│   │   │   │   ├── index.less
│   │   │   │   └── redux
│   │   │   ├── demo # 测试页面
│   │   │   │   └── index.js
│   │   │   └── home # 测试页面
│   │   │       ├── index.js
│   │   │       └── index.less
│   │   ├── redux # 页面 redux
│   │   │   ├── about
│   │   │   │   ├── action.js
│   │   │   │   ├── actionType.js
│   │   │   │   └── reducer.js
│   │   │   ├── demo
│   │   │   │   ├── action.js
│   │   │   │   ├── actionType.js
│   │   │   │   └── reducer.js
│   │   │   ├── home
│   │   │   │   ├── action.js
│   │   │   │   ├── actionType.js
│   │   │   │   └── reducer.js
│   │   │   └── index.js # 页面 reducer 导出文件夹 （新增页面时，需要配置）
│   │   ├── route # client 端路由
│   │   │   ├── asyncLoader.js
│   │   │   └── index.js
│   │   └── util
│   │       └── compLoader.js
│   ├── common # client 端与 server 端共享文件夹
│   │   ├── components # 组件
│   │   │   └── initialHOC # 页面初始化高阶组件（组件导出时需要调用）
│   │   │       ├── connectReduxCom
│   │   │       │   └── index.js
│   │   │       ├── index.js
│   │   │       └── initDataCom
│   │   │           └── index.js
│   │   ├── layout # 项目整体布局组件
│   │   │   └── index.js
│   │   ├── redux # 项目 store 文件
│   │   │   └── store.js
│   │   ├── route # 项目基础路由组件
│   │   │   ├── index.js
│   │   │   └── matchRoute.js
│   │   └── routerConfig.js # 项目路由配置文件 （新增页面时，需要配置）
│   └── server # server端代码文件夹
│       ├── app.js # server 端入口文件
│       ├── middleware # 中间件
│       │   └── reactSSR # react 服务端渲染中间件
│       │       └── index.js
│       ├── route # 路由 server端处理
│       │   └── index.js
│       └── util
│           └── handleAssets.js
└── template # html 模板文件夹
    └── index.html
```

## 注意事项

- 推荐作为学习 `react` 同构应用使用
- 没有在复杂项目中进行验证
- 没有在多层路由场景下验证
- 目前只支持 `react` 同构应用

如果有针对 react 同构方面的问题想讨论的话，推荐提 issue 或者微信（ `go12345` ）
