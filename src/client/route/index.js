import React from "react";
import { Route } from "react-router-dom";
import StyleContext from "isomorphic-style-loader/StyleContext";
import AppRouteContainer from "@common/route";
import AsyncLoader from "./asyncLoader";
/**
 * 客户端路由容器组件
 * @param {*} 客户端页面初始组件
 */
const AppRoute = ({ mod }) => {
  const insertCss = (...styles) => {
    const removeCss = styles.map((style) => style._insertCss());
    return () => removeCss.forEach((dispose) => dispose());
  };
  // 首次加载标识
  let init = true;
  return (
    <AppRouteContainer>
      {(route) => {
        let { path, exact, page } = route;
        return (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => {
              if (init) {
                init = false;
              } else {
                mod = null;
              }
              return (
                <AsyncLoader page={page} mod={mod}>
                  {(Comp) => (
                    <StyleContext.Provider value={{ insertCss }}>
                      <Comp {...props} />
                    </StyleContext.Provider>
                  )}
                </AsyncLoader>
              );
            }}
          ></Route>
        );
      }}
    </AppRouteContainer>
  );
};

export default AppRoute;
