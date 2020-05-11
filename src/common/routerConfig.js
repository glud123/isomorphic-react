/**
 * 路由配置文件 供 client 端和 server 端使用
 * 主要参数包括
 * @param {String} path 页面路由
 * @param {String} page 页面源码路径 （默认页面在 client/page 下编写，可自定义 client 下文件夹为页面源码路径）
 * @param {Boolean} exact 是否严格匹配路由标识
 */
export default [
  {
    path: "/",
    page: "pages/home",
    exact: true,
  },
  {
    path: "/about",
    page: "pages/about",
  },
  {
    path: "/demo",
    page: "pages/demo",
  },
];
