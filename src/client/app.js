import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import matchRoute from "./../share/util/match-route.js";
import AppRoute from "./route";
(() => {
  let initialData = document.getElementById("ssrTextInitData").value;
  if (initialData) {
    initialData = JSON.parse(initialData);
    let targetRoute = matchRoute(document.location.pathname);
    targetRoute.initialData = initialData.fetchData;
    targetRoute.page = initialData.page;
  }
  hydrate(
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>,
    document.getElementById("app")
  );
})();
