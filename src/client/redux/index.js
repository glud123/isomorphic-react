import { combineReducers } from "redux";
import homeReucer from "./home/reducer";
import aboutReucer from "./about/reducer";
import demoReucer from "./demo/reducer";

export default combineReducers({
  homeReucer,
  aboutReucer,
  demoReucer,
});
