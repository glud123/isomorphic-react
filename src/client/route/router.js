import Home from "./../pages/home.js";
import About from "./../pages/about.js";
import Demo from "./../pages/demo.js";
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
