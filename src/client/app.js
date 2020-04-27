import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./route";

hydrate(
  <BrowserRouter>
    <AppRoute />
  </BrowserRouter>,
  document.getElementById("app")
);
