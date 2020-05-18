import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoute from "./route";
import compLoader from "./util/compLoader";
import matchRoute from "@common/route/matchRoute";
import appStore from "@common/redux/store";
let page = matchRoute(document.location.pathname).page;
compLoader(page).then((mod) => {
  // 客户端初始化时，取服务端注入的 store 数据
  const store = appStore(window.__INIT_STORE__);
  // 将当前应用的 store 提供给 initDataCom 组件，用来触发页面异步请求
  window.__STORE__ = store;
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <AppRoute mod={mod.default} />
      </BrowserRouter>
    </Provider>,
    document.getElementById("app")
  );
  // 清空服务端注入的 store 数据
  window.__INIT_STORE__ = null;
});
