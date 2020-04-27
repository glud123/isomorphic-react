import Home from "../client/pages/home.js";
import About from "../client/pages/about.js";
import Demo from "../client/pages/demo.js";
export default [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/demo",
    component: Demo,
  },
];
