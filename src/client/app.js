import React from "react";
import { hydrate } from "react-dom";
import Demo from "./pages/demo.js";

hydrate(<Demo />, document.getElementById("app"));
