import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../layout.js";
import router from "../../share/route-config.js";

export default function AppRoute(props) {
  return (
    <Layout>
      <Switch>
        {router.map((item, index) => {
          let { path, exact, initialData } = item;
          if (item.initialData) {
            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={(props) => {
                  props.initialData = initialData;
                  return <item.component {...props} />;
                }}
              ></Route>
            );
          }
          return <Route key={path} {...item}></Route>;
        })}
      </Switch>
    </Layout>
  );
}
