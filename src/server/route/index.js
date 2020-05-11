import React from "react";
import { Route } from "react-router-dom";
import AppRouteContainer from "../../common/route";
/**
 * server 端路由容器组件
 * @param {Object} initialData 页面初始数据
 * @param {Object} pageInfo 页面描述信息
 * @param {Object} component 当前请求路径下的页面组件
 */
const AppRoute = ({ initialData, pageInfo, component: Comp }) => {
  return (
    <AppRouteContainer>
      {(route) => {
        let { path, exact } = route;
        return (
          <Route
            key={route.path}
            path={path}
            exact={exact}
            render={(props) => (
              <Comp {...props} pageInfo={pageInfo} initialData={initialData} />
            )}
          ></Route>
        );
      }}
    </AppRouteContainer>
  );
};

export default AppRoute;
