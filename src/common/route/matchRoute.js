import { matchPath } from "react-router";
import routerList from "../routerConfig";

/**
 * 根据 path 匹配路由
 * @param {String} path 请求的路径
 */
export default (path) => {
  for (const router of routerList) {
    if (matchPath(path, router)) {
      return router;
    }
  }
};
