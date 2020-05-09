import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./route";
import compLoader from "./util/compLoader";
import matchRoute from "../common/route/matchRoute";
let page = matchRoute(document.location.pathname).page;
compLoader(page).then((mod) => {
  hydrate(
    <BrowserRouter>
      <AppRoute mod={mod.default} />
    </BrowserRouter>,
    document.getElementById("app")
  );
});
