import React from "react";
import { Switch } from "react-router-dom";
import Layout from "../layout";
import router from "../routerConfig";

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
