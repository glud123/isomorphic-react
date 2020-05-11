import React from "react";
import { Switch } from "react-router-dom";
import Layout from "../layout";
import router from "../routerConfig";
/**
 * 路由容器公共组件 提供给 client 端和 server 端使用
 */
export default function AppRouteContainer({children}) {
  return (
    <Layout>
      <Switch>
        {router.map((item, index) => {
          return children(item);
        })}
      </Switch>
    </Layout>
  );
}
