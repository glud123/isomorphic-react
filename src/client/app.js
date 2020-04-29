import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import StyleContext from "isomorphic-style-loader/StyleContext";
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
  const insertCss = (...styles) => {
    const removeCss = styles.map((style) => style._insertCss());
    return () => removeCss.forEach((dispose) => dispose());
  };
  hydrate(
    <BrowserRouter>
      <StyleContext.Provider value={{ insertCss }}>
        <AppRoute />
      </StyleContext.Provider>
    </BrowserRouter>,
    document.getElementById("app")
  );
})();
