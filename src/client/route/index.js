import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../layout.js";
import router from "./router.js";

export default function AppRoute(props) {
  return (
    <Layout>
      <Switch>
        {router.map((item, index) => {
          return <Route key={item.path} {...item}></Route>;
        })}
      </Switch>
    </Layout>
  );
}
